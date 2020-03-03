const { join } = require("path");
const webpack = require("webpack");
const StylelintPlugin = require("stylelint-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const styleLintPlugin = new StylelintPlugin();

module.exports = {
  context: __dirname,
  entry: "./server/index.js",
  output: {
    path: __dirname,
    filename: "server.js",
  },
  target: "node",
  watch: true,
  externals: [nodeExternals()],
  mode: "production",
  module: {
    rules: [{
      test: /\.ejs$/,
      loader: "raw-loader"
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      }, {
        loader: "eslint-loader",
        options: {
          failOnWarning: true,
          failOnError: true
        }
      }]
    }, {
      test: /\.s?css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader"
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
          modules: {
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
          }
        }
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader"
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
          name: "[folder]/[name].[ext]",
          emitFile: false
        }
      }
    }]
  },
  resolve: {
    alias: {
      "@approot": __dirname,
      "@appRoot": __dirname,
      "@app": join(__dirname, "app")
    },
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react"
    }),
    styleLintPlugin
  ]
};
