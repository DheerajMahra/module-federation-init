const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 4000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "button",
      filename: 'button_remote_entry.js',
      exposes: {
        './App': './src/App'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps['react'],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps['react-dom'],
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ]
}