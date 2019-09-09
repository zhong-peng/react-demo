import React, { Component, Fragment } from 'react'
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Button
} from 'antd'

@Form.create()
export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Fragment>
        <h2 style={{
          textAlign: 'center',
          margin: '32px 0 16px'
        }}>Cow Plus 后台管理系统</h2>
        <Row>
          <Col span={8} offset={8}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              <Form.Item
                style={{textAlign: 'center'}}
              >
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
