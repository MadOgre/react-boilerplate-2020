const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: join(__dirname, "assets", "index.ejs")
});
const webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: ["./assets/index.ejs", "normalize.css", "./assets/scss/global.scss", "./assets/js/main.js"],
  mode: "development",
  module: {
    rules: [{
      test: /\.ejs$/,
      loader: "raw-loader"
    }, {
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
        options: {
          sourceMap: true
        }
      }, {
        loader: "postcss-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-resources-loader",
        options: {
          sourceMap: true,
          resources: join(__dirname, "assets", "scss", "variables.scss")
        }
      }],
      exclude: /\.module\.s?css$/
    }, {
      test: /\.module\.s?css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true,
          modules: {
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
          }
        }
      }, {
        loader: "postcss-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-resources-loader",
        options: {
          sourceMap: true,
          resources: join(__dirname, "assets", "scss", "variables.scss")
        }
      }]
    }, {
      test: /\.(png|jpe?g|svg|gif|eot|ttf|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[folder]/[name].[ext]",
          emitFile: false
        }
      }
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    clientLogLevel: "silent",
    contentBase: join(__dirname, "assets"),
    historyApiFallback: true,
    host: "0.0.0.0",
    public: "http://localhost:4000",
    hot: true,
    open: true,
    overlay: true,
    port: 4000,
    stats: "errors-only"
  },
  devtool: "source-map",
  plugins: [
    htmlWebpackPlugin,
    new webpack.ProvidePlugin({
      React: "react"
    })
  ]
};