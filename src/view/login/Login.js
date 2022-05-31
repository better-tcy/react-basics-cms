import React, { memo, useContext } from 'react'

import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import {
  setMenuDataA,
  setMenuPathArrA,
  setCurrentOneMenuPathA,
  setCurrentTwoMenuPathA,
} from '@/store/createAction/frameWork'

import { ThemeContext } from '@/App'

import loginCss from './login.module.css'
import './loginResetAntd.css'

// 模拟导航数据
import menuData from '@/assets/data/menuData'

const Login = memo(() => {
  const theme = useContext(ThemeContext)

  const history = useHistory()

  const dispatch = useDispatch()

  const onFinish = () => {
    localStorage.setItem('token', 'token')
    // 将导航数据保存到redux中
    dispatch(setMenuDataA(menuData))

    // 递归把导航菜单转成一维数组（path）
    const menuPathArr = []

    function recurseArr(arr) {
      arr.forEach((item) => {
        menuPathArr.push(item.path)
        if (item.children) {
          recurseArr(item.children)
        }
      })
    }

    recurseArr(menuData)
    // 将导航的一维数组 保存到redux中
    dispatch(setMenuPathArrA(menuPathArr))

    let oneMenuPath = ''
    let twoMenuPath = ''
    const firstMenu = menuData[0]

    if (firstMenu?.children && firstMenu.children.length !== 0) {
      oneMenuPath = firstMenu?.path
      twoMenuPath = firstMenu.children[0]?.path
    } else {
      twoMenuPath = firstMenu?.path
    }
    // 将选中或展开的导航保存到redux中
    dispatch(setCurrentOneMenuPathA(oneMenuPath))
    dispatch(setCurrentTwoMenuPathA(twoMenuPath))

    history.replace('/content')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <div
        className={loginCss.content}
        style={{ backgroundImage: `url(${theme.loginBgImg.default})` }}
      >
        <div className={loginCss.card}>
          <h1>Hello Betteryourself</h1>
          <Form
            style={{ width: '100%' }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                placeholder="Please input your username!"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                placeholder="Please input your password!"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
})

export default Login
