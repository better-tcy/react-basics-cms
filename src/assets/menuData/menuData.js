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
        path: '/content/one/one',
      }, {
        name: 'oneTwo',
        path: '/content/one/two',
      }
    ]
  },
  {
    name: 'two',
    path: '/content/two',
    children: [
      {
        name: 'twoOne',
        path: '/content/two/one',
      }, {
        name: 'twoTwo',
        path: '/content/two/two',
      }
    ]
  }
]

export default menuData