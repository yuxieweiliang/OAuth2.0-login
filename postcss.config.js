module.exports = {
  plugins: [
    // require('autoprefixer'),
    // 新生语法和前缀
    require('postcss-cssnext')({
      browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie>=8', '>1% in CN'],
    }),
  ]
};