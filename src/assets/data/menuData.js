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
        path: '/content/one/One',
      }, {
        name: 'oneTwo',
        path: '/content/one/Two',
      }
    ]
  },
  // {
  //   name: 'two',
  //   path: '/content/two',
  //   children: [
  //     {
  //       name: 'twoOne',
  //       path: '/content/two/One',
  //     }, {
  //       name: 'twoTwo',
  //       path: '/content/two/Two',
  //     }
  //   ]
  // }
]

export default menuData