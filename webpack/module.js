const marked = require("marked");
module.exports = {
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
    /*{
      test: /\.json$/,
      use: 'json-loader'
    },*/

    // 处理 css
    {
      test: /\.css$/,
      use: ['style-loader','css-loader?modules','postcss-loader']
    },

    // 处理 css
    {
      test: /\.less/,
      use: ['style-loader','css-loader?modules','postcss-loader','less-loader']
    },
    // 处理图片
    {
      test: /\.(jpg|png|jpeg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 3048,
          name: '[name].[ext]'
        }
      }]
    },

    // 处理字体文件
    {
      test: /\.(woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 3048,
          name: '[name].[ext]'
        }
      }]
    },
    {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
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
      test: /\.(mpeg|mp4|webm|ogv|wav|mp3|flv)$/,
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
};