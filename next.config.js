const webpack = require("webpack")
const { parsed: localEnv } = require("dotenv").config()
const withCSS = require("@zeit/next-css")
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer")

module.exports = withCSS(
  withBundleAnalyzer({
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
      return config
    }
  })
)
