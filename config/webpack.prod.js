const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackBundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const prodConfig = merge(baseConfig, {
  mode: "production",
  output: {
    // 可以配置cdn地址，这里和dev环境可以一样，也可以不一样，根据当前服务器来
    // publicPath: "/",
    // 生成的文件名 文件名-8位长度的hash.js
    filename: "js/[name].[contenthash:6].js",
    // 除了entry定义的js之外的js打包成这个，不设置这个的话打包出来就是0.bundle.js ...，
    chunkFilename: "js/[name].[chunkhash:6].js",
    path: path.resolve(__dirname, "../dist"),
  },

  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 5, // 按需加载时的最大并行请求数。
      maxInitialRequests: 3, // 入口点的最大并行请求数。
      enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略。
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        minify: TerserPlugin.esbuildMinify, // 使用esbuild编译，加快速度
      }),
    ],
  },

  plugins: [new WebpackBundleAnalyzerPlugin()],
});

module.exports = prodConfig;
