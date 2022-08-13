const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// terser-webpack-plugin webpack5 自带的
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
// const glob = require("glob");

module.exports = {
  // mode: "production",
  // devtool: "cheap-module-source-map",
  entry: path.resolve(__dirname, "../src/index.js"),
  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   filename: "[name].[chunkhash:6].bundle.js",
  // },

  

  resolve: {
    extensions: [".js", ".ts", ".json", ".tsx", ".jsx", ".css"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      utils: path.resolve(__dirname, "../src/utils"),
    },
  },
  cache: {
    type: "filesystem",
  },

  module: {
    rules: [
      {
        test: /\.(j|t)s|((t|j)sx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "media/[name].[contenthash:7].[ext]",
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[contenthash:6][ext]",
        },

        // use: [
        //   {
        //     loader: "url-loader",
        //     options: {
        //       limit: 100,
        //       esModule: false,
        //       name: "images/[name]_[contenthash:6].[ext]",
        //     },
        //   },
        // ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/source",
        generator: {
          filename: "fonts/[name].[contenthash:7].[ext]",
        },
      },

      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.scss|sass$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },

  

  plugins: [
    // css
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css",
      chunkFilename: "css/[id].[contenthash:6].css",
      ignoreOrder: true,
    }),
    // 删除无用的 css 代码，css tree shaking
    // new PurgecssPlugin({
    //   paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // "process.env"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],

};
