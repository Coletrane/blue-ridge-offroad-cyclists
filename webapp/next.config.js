const webpack = require('webpack')
const { parsed: localEnv} = require('dotenv').config({
  path: __dirname + '/../.env'
})
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(localEnv)
    )
    return config
  }
})
