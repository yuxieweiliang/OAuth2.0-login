// 入口，引入，可以使用es6语法
// require('babel-core/register');
require('@babel/polyfill');
require('@babel/register')({
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    '@babel/transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties'
  ],
  // plugins: ["transform-decorators-legacy", "transform-es2015-modules-commonjs"]
});

require('./src');
console.log(process.env.NODE_ENV);
// , "transform-object-rest-spread"

