const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

const CracoLessPlugin = require('craco-less');

// const { getThemeVariables } = require('antd/dist/theme');

// webpack额外的配置
module.exports = {
  webpack: {
    //配置别名
    alias: {
      "@": resolve('src'),
      "page": resolve('src/component/business-components/page')
    }
  },
  babel: {
    plugins: [['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }]],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 自定义主题 更多配置请参考 https://ant.design/docs/react/customize-theme-cn
            // 修改完之后记得重启项目才会生效
            modifyVars: {
              // '@primary-color': '#1DA57A',
            },
            // modifyVars: getThemeVariables({
            //   dark: true, // 开启暗黑模式
            //   compact: true, // 开启紧凑模式
            // }),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}