const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: join(__dirname, "assets", "index.ejs")
});

module.exports = {
  context: __dirname,
  entry: ["./assets/index.ejs", "./assets/js/main.js"],
  mode: "development",
  module: {
    rules: [{
      test: /\.ejs$/,
      loader: "raw-loader"
    }]
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
  plugins: [
    htmlWebpackPlugin
  ]
};