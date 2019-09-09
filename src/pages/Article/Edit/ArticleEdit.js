import React, { Component, createRef } from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  message,
  DatePicker
} from 'antd'
import E from 'wangeditor'

import moment from 'moment'

import { fetchArticle, saveArticle } from '@/requests'

@Form.create()
export default class ArticleEdit extends Component {
  constructor () {
    super()
    this.editorRef = createRef()
    // 这里的id是用于保存的时候知道是保存哪篇文章
    // content是用于editor的
    this.state = {
      id: '',
      content: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
          createAt: values.createAt.format('x'),
          id: this.state.id
        })
        saveArticle(data)
          .then(resp => {
            if (resp.data.code === 200) {
              message.success(resp.data.msg)
              this.props.history.goBack()
            }
          })
      }
    });
  }
  // 初始化编辑器
  initEditor = () => {
    const _self = this;
    // 创建一个编辑器的实例
    this.editorE = new E(this.editorRef.current)
    // 自定义编辑器的change事件，在这里去做一次setState，让state里的content和输入框里的一致
    this.editorE.customConfig.onchange = function(content) {
      _self.setState({
        content
      })
    }
    this.editorE.customConfig.zIndex = 100
    // 创建
    this.editorE.create()
  }
  componentDidMount () {
    // 在didMount的时候，初始化一个编辑器
    this.initEditor()
    // 请求初始数据
    fetchArticle(this.props.match.params.id)
      .then(resp => {
        if (resp.data.code === 200) {
          // 如果成功，把除了编辑器以外的字段都用setFieldsValue的方法设置到页面上
          this.props.form.setFieldsValue({
            author: resp.data.data.author,
            title: resp.data.data.title,
            createAt: moment(Number.parseInt(resp.data.data.createAt, 10))
          })
          // 把id和content保存到state里面
          this.setState({
            id: resp.data.data.id,
            content: resp.data.data.content
          })
          // 手动设置editor的值
          this.editorE.txt.html(resp.data.data.content)
        }
      })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16},
    };
    return (
      <Card
        title="文章列表"
        bordered={false}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item
            {...formItemLayout}
            label="文章标题"
          >
            {
              getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题！' }],
              })(
                <Input placeholder="文章标题" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="作者"
          >
            {
              getFieldDecorator('author', {
                rules: [
                  {
                    required: true,
                    message: '请输入作者'
                  }
                ],
              })(
                <Input placeholder="作者" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="时间"
          >
            {
              getFieldDecorator('createAt', {
                rules: [{ required: true, message: '请选择时间' }],
              })(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )
            }
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="正文"
          >
            {
              getFieldDecorator('content', {
                // 不加这一句，在提交的时候获取不值
                initialValue: this.state.content
              })(
                <div ref={this.editorRef}></div>
              )
            }
          </Form.Item>
          <Form.Item
            wrapperCol={{span: 16, offset: 4}}
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
