import React, { Component, Fragment, createRef } from 'react'
import {
  Card,
  Row,
  Col
} from 'antd'

import { getUserStatistics } from '@/requests'

import echarts from 'echarts'

import './dashboard.less'

export default class Dashboard extends Component {
  constructor() {
    super()
    this.userIncrement = createRef()
  }
  componentDidMount () {

    getUserStatistics()
      .then(resp => {
        if (resp.data.code === 200) {
          const {
            title,
            data
          } = resp.data

          const xAxisData = data.map(item => item.month)
          const seriesData = data.map(item => item.count)

          this.initUserIncrementChart(title, xAxisData, seriesData)
        }
      })
  }
  initUserIncrementChart (title, xAxisData, seriesData) {
    this.userIncrementChart = echarts.init(this.userIncrement.current);
    this.userIncrementChart.setOption({
      title: {
        text: title
      },
      xAxis: {
          type: 'category',
          data: xAxisData
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: seriesData,
          type: 'line'
      }]
    })
  }
  render() {
    return (
      <Fragment>
        <Card
          title="概览"
          bordered={false}
        >
          <Row>
            <Col className="gutter-row" span={8}>
              <div className="summary-box" style={{backgroundColor: '#F06292'}}>
                总的文章数: 100
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="summary-box" style={{backgroundColor: '#4FC3F7'}}>
                总的用户数: 100 
              </div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="summary-box" style={{backgroundColor: '#AED581'}}>
                本月新增用户数: 1024
              </div>
            </Col>
          </Row>
        </Card>
        <Row>
          <Col span={12}>
            <div style={{height: '280px'}} ref={this.userIncrement} />
          </Col>
        </Row>
      </Fragment>
    )
  }
}
