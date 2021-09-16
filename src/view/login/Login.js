import React, { memo } from 'react';

import { useHistory } from "react-router-dom";

// 样式
import loginCss from './login.module.css'
import './loginResetAntd.css'

import { Form, Input, Button } from 'antd';

const Login = memo(() => {

  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);
    history.replace('/content')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className="login">
      <div className={loginCss.content}>

        <div className={loginCss.card}>
          <h1 className={loginCss.title}>哈哈哈管理系统</h1>
          <div className={loginCss.form} >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;