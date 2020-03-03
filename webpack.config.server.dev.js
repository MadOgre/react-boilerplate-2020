const { join } = require("path");
const webpack = require("webpack");
const StylelintPlugin = require("stylelint-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const styleLintPlugin = new StylelintPlugin();
const startServerPlugin = new StartServerPlugin({
  name: "server.js"
});
const cleanWebpackPlugin = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ["./hot/*"]
});

module.exports = {
  context: __dirname,
  entry: ["webpack/hot/poll?1000", "./server/index.js"],
  output: {
    path: __dirname,
    filename: "server.js",
    hotUpdateChunkFilename: "hot/hot-update-[hash].js",
    hotUpdateMainFilename: "hot/hot-update-[hash].json"
  },
  target: "node",
  watch: true,
  externals: [nodeExternals({
    whitelist: ["webpack/hot/poll?1000"]
  })],
  mode: "development",
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
        loader: "postcss-loader",
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
    styleLintPlugin,
    startServerPlugin,
    new webpack.HotModuleReplacementPlugin(),
    cleanWebpackPlugin
  ]
};
