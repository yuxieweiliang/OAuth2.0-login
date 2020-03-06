/* const plugins = []
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
  plugins.push('transform-remove-console')
} */

module.exports = {
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current",
          "browsers": ["ie >=9"]
        },
        "useBuiltIns": true
      }
    ]
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-transform-runtime",
    "@babel/transform-flow-strip-types",
    "@babel/proposal-class-properties"
  ]
}



