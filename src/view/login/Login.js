import React, { memo, useContext } from 'react';

import { useHistory } from "react-router-dom";

import { Form, Input, Button, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { ThemeContext } from '@/App';

import loginCss from './login.module.css'
import './loginResetAntd.css'


const Login = memo(() => {

  const history = useHistory();

  const theme = useContext(ThemeContext)

  const onFinish = () => {
    history.replace('/content')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className={loginCss.content} style={{ backgroundImage: `url(${theme.loginBgImg.default})` }}>
        <div className={loginCss.card}>
          <h1>Hello Betteryourself</h1>
          <Form
            style={{ width: '100%' }}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Please input your username!" prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Please input your password!" prefix={<LockOutlined className="site-form-item-icon" />} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 5, span: 18 }}>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
});

export default Login;