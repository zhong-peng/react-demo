import React, { Component } from 'react'
import moment from 'moment'
import {
  Table,
  Button,
  Icon,
  Tag,
  Tooltip,
  Modal,
  message,
  Card
} from 'antd'

import XLSX from 'xlsx'

import { fetchArticleList, deleteArticleById } from '@/requests'

export default class ArticleList extends Component {
  columns = [{
    title: '文章标题',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: '阅读量',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => {
      const isHot = Number.parseInt(amount, 10) > 800
      return isHot ? <Tag color="#f50">{amount}</Tag> : <Tag color="green">{amount}</Tag>
    }
  }, {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  }, {
    title: '添加日期',
    dataIndex: 'createAt',
    key: 'createAt',
    render: (createAt) => {
      return moment(Number.parseInt(createAt, 10)).format('YYYY-MM-DD hh:mm:ss');
    }
  }, {
    title: '操作',
    key: 'actions',
    render: (text, record, index) => {
      return (
        <Button.Group size='small'>
          <Tooltip placement="top" title="编辑">
            <Button type="primary" onClick={this.handleEdit.bind(this, record.id)}>
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="删除">
            <Button type="danger" onClick={this.handleDelete.bind(this, record.id, record.title)}>
              <Icon type="delete" />
            </Button>
          </Tooltip>
        </Button.Group>
      )
    },
  }]
  constructor () {
    super()
    this.isComponentMounted = false
    this.state = {
      dataSource: [],
      isLoading: false,
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
    }
  }
  handleDelete = (id, title) => {
    Modal.confirm({
      centered: true,
      maskClosable: true,
      okText: "我确定",
      cancelText: "我点错了",
      content: <span>确认要删除<span style={{color: '#f00', padding: '0 5px'}}>{title}</span>吗？</span>,
      onOk: () => {
        this.setState({
          isLoading: true,
        })
        deleteArticleById(id)
          .then(resp => {
            if (resp.data.code === 200) {
              this.setState({
                currentPage: 1
              }, () => {
                this.fetchArticles()
                message.success(resp.data.msg)
              })
            }
          })
      }
    })
  }
  handleEdit = (id) => {
    this.props.history.push(`/admin/article/edit/${id}`, {
      x: 1
    })
  }
  fetchArticles = () => {
    this.setState({
      isLoading: true
    })
    fetchArticleList({
      offset: (this.state.currentPage - 1) * this.state.pageSize,
      limited: this.state.pageSize
    })
      .then(resp => {
        if (this.isComponentMounted === false) {
          return;
        }
        if (resp.data.code === 200) {
          this.setState({
            dataSource: resp.data.data,
            totalCount: resp.data.totalCount,
            currentPage: resp.data.currentPage,
            isLoading: false
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  onTableChange = ({ current, pageSize }) => {
    const currentPage = (this.state.pageSize === pageSize) ? current : 1
    this.setState({
      currentPage,
      pageSize
    }, () => {
      this.fetchArticles()
    })
  }

  exportXlsx = () => {
    const data = this.state.dataSource.reduce((result, item) => {
      const row = [item.title, item.amount, item.author, item.createAt]
      result.push(row)
      return result
    }, [])

    const title = this.columns.map(item => item.title)
    title.pop()

    data.unshift(title)

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "articles.xlsx");
  }

  componentDidMount () {
    this.isComponentMounted = true
    this.fetchArticles()
  }
  
  componentWillUnmount () {
    this.isComponentMounted = false
  }

  render () {
    return (
      <Card
        title="文章列表"
        extra={<Button size="small" type="primary" onClick={this.exportXlsx}>导出excel</Button>}
        bordered={false}
      >
        <Table
          loading={this.state.isLoading}
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.columns}
          onChange={this.onTableChange}
          pagination={{
            pageSize: this.state.pageSize,
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20'],
            current: this.state.currentPage,
            total: this.state.totalCount
          }}
        />
      </Card>
    )
  }
}
