const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: join(__dirname, "assets", "index.ejs")
});
const cleanWebpackPlugin = new CleanWebpackPlugin();

module.exports = {
  context: __dirname,
  entry: "./assets/js/main.js",
  output: {
    hashDigestLength: 8,
    path: join(__dirname, "public"),
    filename: "bundle.[contenthash].js"
  },
  mode: "production",
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            ["@babel/preset-env", {modules: false, useBuiltIns: "usage", corejs: {version: 3, proposals: true}}],
            "@babel/preset-react"
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators",{legacy: true}],
            ["@babel/plugin-proposal-class-properties", {loose: true}]
          ]
        }
      }
    }, {
      test: /\.s?css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
      }, {
        loader: "sass-loader",
      }]
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    htmlWebpackPlugin,
    cleanWebpackPlugin
  ]
};