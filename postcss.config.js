module.exports = {
    plugins: [
      require('autoprefixer'),
      require('css-mqpacker'),
      require('postcss-flexbugs-fixes'),
      require('cssnano')({
        preset: [
          'default', {
            discardComments: {
              removeAll: true,
            }
          }
        ]
      })
    ]
  }
