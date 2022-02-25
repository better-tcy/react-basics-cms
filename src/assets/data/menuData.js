const menuData = [
  {
    name: '首页',
    path: '/content/home',
  },
  {
    name: 'one',
    path: '/content/one',
    children: [
      {
        name: 'oneOne',
        path: '/content/one/OneOne',
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
      }, {
        name: 'oneTwo',
        path: '/content/one/OneTwo',
      }
    ]
  },
]

export default menuData