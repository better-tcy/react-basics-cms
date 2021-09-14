import Mock from 'mockjs';

// 模拟延迟
Mock.setup({
  timeout: 200
})

// 生成随机数据
Mock.mock('http://localhost:8080/commonData', function () {
  return Mock.mock({
    'code': 0,
    'msg': '',
    'result': '我是公共的数据 哈哈哈'
  })
})