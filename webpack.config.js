const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: join(__dirname, "assets", "index.ejs")
});
const cleanWebpackPlugin = new CleanWebpackPlugin();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css",
  chunkFilename: "[id].[contenthash].css",
});
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const copyPlugin = new CopyPlugin([{
  from: "assets/icons",
  to: "icons"
}]);

module.exports = {
  context: __dirname,
  entry: ["normalize.css", "./assets/scss/global.scss", "./assets/js/main.js"],
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
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "css-loader",
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader",
      }, {
        loader: "sass-resources-loader",
        options: {
          resources: join(__dirname, "assets", "scss", "variables.scss")
        }
      }],
      exclude: /\.module\.s?css$/
    }, {
      test: /\.module\.s?css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
          }
        }
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader",
      }, {
        loader: "sass-resources-loader",
        options: {
          resources: join(__dirname, "assets", "scss", "variables.scss")
        }
      }]
    }, {
      test: /\.(png|jpe?g|svg|gif|eot|ttf|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[folder]/[name].[ext]"
        }
      }
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: false,
  plugins: [
    htmlWebpackPlugin,
    cleanWebpackPlugin,
    miniCssExtractPlugin,
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    copyPlugin,
    new webpack.ProvidePlugin({
      React: "react"
    })
  ]
};