const path = require('path');
const webpack = require('webpack');

module.exports = {
   entry: "./app-src/index.js", // Entry File
   output: {
     path: path.resolve(__dirname, "app"), //Output Directory
     filename: "bundle.js", //Output file
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }
    ]
  }
};
