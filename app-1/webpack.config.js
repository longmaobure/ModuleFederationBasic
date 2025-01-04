const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  devServer:{
    port:8081,
    hot:true,
  },
  mode:"development",
  // 是否生成sourcemap
  devtool:false,
  // 打包入口
  entry: path.resolve(__dirname, "./src/main.js"),
  // 输出路径
  output:{
    path: path.resolve(__dirname, "./dist"),
    // 必须指定产物的完整路径，否则使用方无法正确加载产物资源
    publicPath: `http://localhost:8081/dist/`,
  },
  plugins:[
    new ModuleFederationPlugin({
      // 模块联邦应用名称
      name:"app1",
      // MF 模块入口，可以理解为该应用的资源清单
      // 疑问: 这个option在官方文档中并没找到
      filename: `remoteEntry.js`,
      exposes:{
        "./utils":"./src/utils.js",
      },
      shared:['lodash']
    })
  ]
}