const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
// 合并webpack配置
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理
const modules = require("./module");



// 项目根目录,请确保命令在根目录执行 sails-webpack2
module.exports = function(publicPath) {
  return {
    entry: {},
    output: {
      path: publicPath, // 也可以使用 publicPath
      filename: '[name].build.js',
      chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    module: modules,
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.es6', '.less'],
      alias: {
        moment: "moment/min/moment-with-locales.min.js",
        '@utils': path.resolve(process.cwd(), 'client', 'utils')
        //'type': path.resolve(rootDir, './lib/jquery.min.js')
      }
    },
    /**
     * 配置外部访问的公共代码
     */
    externals: {
      window: 'window'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: 'all',
            priority: -10 // 优先
          },
          // 首先: 打包node_modules中的文件
          common: {
            test: /[\\/]src[\\/]/,
            name: "commons",
            chunks: "all",
            minSize: 1,
            priority: 10
          },
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin(['./dist/'], {
        verbose: true,
        dry: false,
      }),
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000 // Minimum number of characters
      }),
    ]
  };
};