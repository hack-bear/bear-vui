'use strict';

const gulp = require('gulp')
const gutil = require("gulp-util")
const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const config = require("./webpack.config.js")

gulp.task('build', ['webpack-build'], function() {
  console.log('TODO: build')
})

gulp.task("webpack-build", function(callback) {
  webpack(config('build'), function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err)
      gutil.log("[webpack]", stats.toString({/* opts */}))
      callback()
  })
})

gulp.task("dev", function (callback) {
  new WebpackDevServer(webpack(config("dev")), {
      publicPath: "/dist/",
      hot: true,
      proxy: {
        '/api/*': {
          target: 'http://localhost:3001/',
          changeOrigin: true,
          // rewrite: function(req) {
          //   req.url = req.url.replace(/^\/api/, '');
          // }
        }
      },
      historyApiFallback: true
    }).listen(3000, "0.0.0.0", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err)
    gutil.log("[webpack-dev-server]", "http://localhost:3000/index.html")
    // callback()
  })
})
