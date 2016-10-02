'use strict';

const path = require("path")
const webpack = require("webpack")
const WebpackCleanPlugin = require('webpack-clean-plugin')

const PORT = 3000

module.exports = function (target) {
  let config = {
    entry: {
      app: [
        "./src/app.js"
      ],
      vendor: [
        "vue",
        "bluebird",
        "vue-router"
      ]
    },
    output: {
      publicPath: "/dist/",
      path: __dirname + "/dist",
      filename: "[name].js",
      chunkFilename: "[name].[hash].js"
    },
    module: {
      loaders: [
        {
          test:   /\.(png|jpg)$/,
          loader: "url-loader",
          query: {
            limit: 10000,
          }
        },
        {
          test: /\.styl$/,
          loader: 'style-loader!css-loader!stylus-loader'
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    },
    plugins: [
      new WebpackCleanPlugin({
        on: "emit",
        path: ['./dist']
      }),
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
    ]
  }

  const appConfig = {
    VERSION: JSON.stringify(1),
    API_BASE: JSON.stringify('/api')
  }

  if (target === "dev") {
    Object.keys(config.entry).forEach(function (key) {
      config.entry[key].unshift("webpack-dev-server/client?http://0.0.0.0:" + PORT, "webpack/hot/dev-server");
    });

    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    appConfig.DEBUG = JSON.stringify(true)
  } else {
    appConfig.DEBUG = JSON.stringify(false)
  }
  config.plugins.push(new webpack.DefinePlugin(appConfig))

  return config;
}
