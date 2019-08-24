/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'cheap-source-map',
      entry: {
        app: [
          'webpack-dev-server/client?http://0.0.0.0:8080/',
          'webpack/hot/only-dev-server',
          'react-hot-loader/patch',
          './index.js'
        ]
      },
      plugins: [
        this.dashboardPlugin,
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('dev'),
            APP_ENV: JSON.stringify('dev'),
            ADD_DEV_ROUTES: JSON.stringify(true),
            ADD_LOGGER_MW: JSON.stringify(true),
            ADD_REDUX_DEV_TOOLS: JSON.stringify(true),
            SHOW_ENV_NOTICE: JSON.stringify(true),
            MOCK_API: JSON.stringify(false),
            USE_AUTH_TOKEN: JSON.stringify(true),
            ADD_CSRF_TOKEN_FROM_COOKIE: JSON.stringify(false),
            HEADER_AUTH_TOKEN: JSON.stringify('Token 6e9a9b7bfea3b1acb161f7f423bb5184770e8937')
          }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new BundleAnalyzerPlugin()
      ]
    };
    this.config.output.pathinfo = true;
  }
}

module.exports = WebpackDevConfig;
