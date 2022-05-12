import Mock from 'mockjs'

// 模拟延迟
Mock.setup({
  timeout: 200
})

// 公共数据
Mock.mock('http://localhost:3001/commonData/', 'get', function () {
  return Mock.mock({
    code: 0,
    msg: '',
    data: '我是公共的数据 哈哈哈，配置生成页面 请去OneOne目录'
  })
})

// 查看表格数据及详情
Mock.mock(RegExp(`http://localhost:3001/oneOne?.*`), 'get', function (options) {
  console.log(options)
  if (options.url.indexOf('?') !== -1) {
    return Mock.mock({
      code: 0,
      msg: '',
      data: {
        total: 2,
        list: [
          {
            id: 5,
            name: 'tom',
            iphone: '13230975666',
            jobTitle: 1,
            status: 1
          },
          {
            id: 6,
            name: 'jerry',
            iphone: '13230975888',
            jobTitle: 2,
            status: 0
          }
        ]
      }
    })
  } else {
    return Mock.mock({
      code: 0,
      msg: '',
      data: {
        name: '哈哈哈',
        password: '123456',
        fruit: 1,
        radioVal: 1,
        checkboxVal: [1],
        treeVal: [2],
        startDate: 1645514128000,
        endDate: 1645514129000,
        datePickerVal: 1645514128000,
        uploadVal: [
          {
            uid: 1,
            name: 'image.jpg',
            status: 'done',
            url: 'http://101.43.153.100/images/image.jpg'
          }
        ],
        textAreaVal: '回显数据',
        cascaderVal: [1, 2]
      }
    })
  }
})

// 删除某条数据
Mock.mock(RegExp(`http://localhost:3001/oneOne.*`), 'delete', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: '删除成功'
  })
})

// 启用数据
Mock.mock(RegExp(`http://localhost:3001/oneOne/start.*`), 'post', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: '已启用'
  })
})

// 禁用数据
Mock.mock(RegExp(`http://localhost:3001/oneOne/stop.*`), 'post', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: '已禁用'
  })
})

// 新增数据
Mock.mock(RegExp(`http://localhost:3001/oneOne.*`), 'post', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: '添加成功'
  })
})

// 修改数据
Mock.mock(RegExp(`http://localhost:3001/oneOne.*`), 'put', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: '修改成功'
  })
})

// 上传图片
Mock.mock(RegExp(`http://localhost:3001/upload.*`), 'post', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: 'http://101.43.153.100/images/image.jpg'
  })
})

/**
 * 联动下拉框数据
 */

Mock.mock(RegExp(`http://localhost:3001/firstSelectData.*`), 'get', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: [
      {
        id: 1,
        name: 'JavaScript'
      },
      {
        id: 2,
        name: 'Go'
      },
      {
        id: 3,
        name: 'Java'
      }
    ]
  })
})

Mock.mock(RegExp(`http://localhost:3001/secondSelectData.*`), 'get', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: [
      {
        id: 1,
        name: 'React'
      },
      {
        id: 2,
        name: 'Vue'
      },
      {
        id: 3,
        name: 'Angular'
      }
    ]
  })
})

Mock.mock(RegExp(`http://localhost:3001/thirdSelectData.*`), 'get', function (options) {
  console.log(options)
  return Mock.mock({
    code: 0,
    msg: '',
    data: [
      {
        id: 1,
        name: '深入React技术栈'
      },
      {
        id: 2,
        name: '深入浅出React和Redux'
      },
      {
        id: 3,
        name: 'React 进阶之路'
      }
    ]
  })
})
