const path = require('path')
const pkg = require('./package')

module.exports = {
  entry: [
    'src/polyfills.js',
    'src/index.js'
  ],
  html: {
    title: pkg.productName,
    description: pkg.description,
    template: path.join(__dirname, 'index.ejs')
  },
  postcss: {
    plugins: [
      // Your postcss plugins
    ]
  },
  transformModules: ['vue-beautiful-chat', 'escape-goat','msgdown'],

//fine 12/03/2019
  presets: [
    require('poi-preset-bundle-report')(),
    require('poi-preset-offline')({
      pwa: './src/pwa.js', // Path to pwa runtime entry
      pluginOptions: {} // Additional options for offline-plugin
    })
  ]
}