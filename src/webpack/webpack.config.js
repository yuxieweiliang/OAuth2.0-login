const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin'); // 打开指定浏览器
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var extract = require('extract-text-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const marked = require("marked");
const method = require("../utils");
import { location } from "../../config";

// 合并webpack配置
let merge = require('webpack-merge');

// 项目根目录,请确保命令在根目录执行 sails-webpack2
const ROOTS = process.cwd();
// 打包目录
const publicPath = location.dist;
const config = {
  mode: 'development',

  entry: {
    // 将所有公用的东西都放在一个文件里
    vendors: ['react', 'react-dom', 'lodash']
  },

  output: {
    path: publicPath,
    filename: '[name].build.js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },

  module: {
    noParse: [/moment/],
    rules: [
      // 处理 js,es6 / jsx
      {
        test: /\.(js|es6|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              // require('@babel/plugin-proposal-class-properties'),
              // require('@babel/plugin-proposal-object-rest-spread'),
            ]
          }
        },
        exclude: /node_modules/
      },

      // 处理 json
      {
        test: /\.json$/i,
        type: 'javascript/auto',
        use: 'json-loader'
      },

      // 处理 css
      {
        test: /\.css$/,
        use: ['style-loader','css-loader','postcss-loader']
      },
      {
        test: /\.less/,
        use: ['style-loader','css-loader','less-loader','postcss-loader']
      },
      {
        test: /\.s(c|a)ss/,
        use: ['style-loader','css-loader','sass-loader','postcss-loader']
      },
      // 处理图片
      {
        test: /\.(jpg|png|jpeg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]'
          }
        }]
      },

      // 处理字体文件
      {
        test: /\.(woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 3048,
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/i,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 3048,
            name: '[name].[ext]'
          }
        }]
      },

      // 处理视频与音频文件
      {
        test: /\.(mpeg|mp4|webm|ogv|wav|mp3|flv)$/i,
        use: 'file-loader'
      },
      // markdown
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
              pedantic: true,
              renderer: new marked.Renderer()
            }
          }
        ]
      }
    ]
  },

  resolve: {
    modules: [path.resolve(ROOTS, 'node_modules')],
    extensions: ['.js', '.jsx', '.es6', '.less'],
    alias: {
      moment: "moment/min/moment-with-locales.min.js"
      //'type': path.resolve(rootDir, './lib/jquery.min.js')
    }
  },

  /**
   * 配置外部访问的公共代码
   */
  externals: {
    window: 'window'
  },

  plugins: [
    new CleanWebpackPlugin(['./bundle/'], {
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(process.cwd(), 'views', 'client.html'),
      filename: 'client.html',
      // favicon: resolve(__dirname, '..', 'src', 'client', 'static', 'favicon.png'),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(process.cwd(), 'public')
    })
    // 抽取公用脚本
    /*new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors'],
      filename: 'vendors.js',
      minChunks: Infinity,
    }),*/
  ]
};

const viewPath = method.assemblyPath(ROOTS, '/client/container/');
const files = fs.readdirSync(viewPath,'utf-8');

files.map(item => {
  config.entry[item.split('.')[0]] = method.assemblyPath(viewPath, `${item}`);
});

// console.log(config.entry, '==================');
module.exports = config;
