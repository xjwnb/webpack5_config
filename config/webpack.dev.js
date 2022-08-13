const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");

console.log(process.env.NODE_ENV);

const devConfig = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",

  output: {
    // publicPath: "/",
    filename: "static/js/bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },

  devServer: {
    // historyApiFallback: true, // 前端路由配置为 history 模式时用
    hot: true,
    // hotOnly: true,
    compress: true,
    // open: true,
    client: {
      logging: "none", // 去除hrm日志
      overlay: true, // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      progress: true, // 构建进度
    },
  },

  optimization: {
    moduleIds: "named", // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
  },
});

module.exports = devConfig;
