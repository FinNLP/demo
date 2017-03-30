var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./src/main.js",
  output: {
    path: __dirname + "/assets",
    filename: "script.js"
  },
  module: {
  loaders: [
    {
      test: /.js$/,
      loaders: 'buble-loader',
      query: {
        objectAssign: 'Object.assign'
      }
    }
  ]
},
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};