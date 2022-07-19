import React, { memo, useContext } from 'react'

import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import {
  setMenuDataA,
  setMenuPathArrA,
  setCurrentOneMenuPathA,
  setCurrentTwoMenuPathA
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

  const [form] = Form.useForm()

  const login = async () => {
    const values = await form.validateFields()

    console.log('表单数据', values)

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

  return (
    <div className="login">
      <div
        className={loginCss.content}
        style={{ backgroundImage: `url(${theme.loginBgImg.default})` }}
      >
        <div className={loginCss.card}>
          <span className={loginCss.title}>Hello</span>
          <div className={loginCss.form}>
            <Form name="basic" autoComplete="off" form={form}>
              <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
                <Input
                  placeholder="账号："
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password
                  placeholder="密码："
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item>
                <div className={loginCss.login_btn} onClick={login}>
                  登陆
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Login
