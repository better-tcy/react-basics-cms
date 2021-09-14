const path = require("path");

//拼接路径
const resolve = dir => path.resolve(__dirname, dir);

//webpack额外的配置
module.exports = {
  webpack: {
    //配置别名
    alias: {
      "@": resolve('src'),
    }
  }
}
//修改配置相关的东西 项目需要重新运行一下