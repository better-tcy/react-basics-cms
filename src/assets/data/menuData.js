const menuData = [
  {
    name: '首页',
    path: '/content/home'
  },
  {
    name: '使用组件',
    path: '/content/use-components',
    children: [
      {
        name: 'JS配置生成页面',
        path: '/content/use-components/UsePage',
        children: [
          {
            id: 1,
            name: '查看'
          },
          {
            id: 2,
            name: '新建'
          },
          {
            id: 3,
            name: '启用停用'
          },
          {
            id: 4,
            name: '修改'
          },
          {
            id: 5,
            name: '删除'
          },
          {
            id: 6,
            name: '其他按钮'
          }
        ]
      },
      {
        name: 'Search单独使用',
        path: '/content/use-components/UsePageSearch'
      },
      {
        name: 'Modal单独使用',
        path: '/content/use-components/UsePageModal'
      }
    ]
  },
  {
    name: '其他',
    path: '/content/other',
    children: [
      {
        name: '使用redux中间件',
        path: '/content/other/UseRudexMiddleware'
      },
      {
        name: '资源',
        path: '/content/other/Resource'
      }
    ]
  }
]

export default menuData
