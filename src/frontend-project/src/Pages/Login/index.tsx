/*
 * @Author: Carlos
 * @Date: 2021-03-19 18:30:51
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:48:14
 * @Description: file content
 */
import { Form, Input, Button, message } from "antd";
import request from "../../request";
import qs from "qs";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import "./style.css";
import React from "react";

class LoginPage extends Component {
  state = {
    isLogin: false,
  };
  onFinish = (values: any) => {
    // console.log('Received values of form: ', values);
    request
      .post(
        "/api/login",
        qs.stringify({
          password: values.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
        const data: responseResult.login = res.data;
        if (data) {
          this.setState({
            isLogin: true,
          });
        } else {
          message.error("登陆失败");
        }
      });
  };

  render() {
    const { isLogin } = this.state;
    return isLogin ? (
      <Redirect to='/' />
    ) : (
      <div className='login-page'>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: "请输入你的密码！",
              },
            ]}>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
