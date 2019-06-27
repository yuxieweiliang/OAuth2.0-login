var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: './client/app/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'asset'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
        test: /\.json$/,
        use: 'json-loader'
      },

      // 处理 css
      {
        test: /\.css$/,
        use: ['style-loader','css-loader','postcss-loader']
      },

      // 处理 css
      {
        test: /\.less/,
        use: ['style-loader','css-loader','postcss-loader','less-loader']
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
    ]
  },
};
