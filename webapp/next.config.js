const webpack = require('webpack')
const { parsed: localEnv} = require('dotenv').config({
  path: __dirname + '/../.env'
})

module.exports = {
  // exportPathMap: function() {
  //   return {
  //     "/": { page: "/" }
  //   }
  // },
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    )
    return config
  }
}
