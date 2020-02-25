const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: join(__dirname, "assets", "index.ejs")
});
const cleanWebpackPlugin = new CleanWebpackPlugin();

module.exports = {
  context: __dirname,
  entry: ["./assets/js/main.js"],
  output: {
    hashDigestLength: 8,
    path: join(__dirname, "public"),
    filename: "bundle.[contenthash].js"
  },
  mode: "production",
  plugins: [
    htmlWebpackPlugin,
    cleanWebpackPlugin
  ]
};