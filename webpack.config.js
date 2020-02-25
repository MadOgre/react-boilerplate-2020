const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: join(__dirname, "assets", "index.ejs")
});

module.exports = {
  context: __dirname,
  entry: ["./assets/js/main.js"],
  output: {
    hashDigestLength: 8,
    path: join(__dirname, "public"),
    filename: "[contenthash].bundle.js"
  },
  mode: "production",
  plugins: [
    htmlWebpackPlugin
  ]
};