import React, { memo, useState, useCallback } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import { useHistory } from "react-router-dom";
import { renderRoutes } from 'react-router-config'


import { setCurrentOneMenuPathA, setCurrentTwoMenuPathA } from '@/store/createAction/frameWork.js'


// 模拟导航数据
import menuData from '@/assets/menuData/menuData';

// 样式
import frameWorkCss from './frameWork.module.css'

import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  SmileOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;


const FrameWork = memo((props) => {
  const { route } = props

  const history = useHistory();

  const dispatch = useDispatch()

  const [collapsed, setCollapsed] = useState(false)

  const { currentOneMenuPathR, currentTwoMenuPathR } = useSelector((state) => {
    return {
      currentOneMenuPathR: state.get('frameWork').get('currentOneMenuPathR'),
      currentTwoMenuPathR: state.get('frameWork').get('currentTwoMenuPathR')
    }
  }, shallowEqual)

  const toggle = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  const getSelectPath = useCallback((twoMenuPath, oneMenuPath) => {
    history.push(twoMenuPath)

    // 派发(把选中的一级菜单 二级菜单path保存到redux中)
    dispatch(setCurrentTwoMenuPathA(twoMenuPath))
    dispatch(setCurrentOneMenuPathA(oneMenuPath))
  }, [history, dispatch])

  const exit = useCallback(() => {
    // 需要清空缓存数据以及重置redux frameWork state数据
    localStorage.clear()
    dispatch(setCurrentTwoMenuPathA('/content/home'))
    dispatch(setCurrentOneMenuPathA(''))

    history.replace('/login')
  }, [dispatch, history])


  return (
    <Layout style={{ height: '100vh' }}>
      <Sider className={frameWorkCss.navigation} trigger={null} collapsible collapsed={collapsed}>
        <div className={frameWorkCss.cms_name}>{collapsed ? '' : '哈哈哈管理系统'}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentTwoMenuPathR ? currentTwoMenuPathR : '/content/home']} defaultOpenKeys={[currentOneMenuPathR]}>
          {
            menuData.map((oneMenu) => {
              if (!oneMenu.children || oneMenu.children.length === 0) {
                return (<Menu.Item key={oneMenu.path} icon={<HomeOutlined />} onClick={() => { getSelectPath(oneMenu.path) }}>{oneMenu.name}</Menu.Item>)
              } else {
                return (
                  <SubMenu key={oneMenu.path} title={oneMenu.name} icon={<SmileOutlined />}>
                    {
                      oneMenu.children.map((twoMenu) => {
                        return (
                          <Menu.Item key={twoMenu.path} icon={<TeamOutlined />} onClick={() => { getSelectPath(twoMenu.path, oneMenu.path) }}>{twoMenu.name}</Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              }
            })
          }
        </Menu>
      </Sider>

      <Layout>
        <Header className={frameWorkCss.header} >

          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style: { color: '#ffffff' },
            onClick: toggle,
          })}

          <div className={frameWorkCss.header_right}>
            <Button onClick={exit} size="small" type="primary">退出程序</Button>
          </div>

        </Header>
        <Content
          className={frameWorkCss.content}
          style={{
            padding: 20,
          }}
        >
          {
            renderRoutes(route.routes)
          }
        </Content>
      </Layout>
    </Layout>
  );
});


export default FrameWork;