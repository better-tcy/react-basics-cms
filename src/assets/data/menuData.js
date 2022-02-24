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
      }, {
        name: 'oneTwo',
        path: '/content/one/OneTwo',
      }
    ]
  },
]

export default menuData