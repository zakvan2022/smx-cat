/**
 * Default dev server configuration.
 */
const path = require('path');
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: true,
      devtool: 'cheap-source-map',
      entry: {
        app: [
          'whatwg-fetch',
          './index.js'
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('dev'),
            APP_ENV: JSON.stringify('preview'),
            ADD_DEV_ROUTES: JSON.stringify(true),
            ADD_LOGGER_MW: JSON.stringify(false),
            ADD_REDUX_DEV_TOOLS: JSON.stringify(false),
            SHOW_ENV_NOTICE: JSON.stringify(true),
            MOCK_API: JSON.stringify(false),
            USE_AUTH_TOKEN: JSON.stringify(true),
            ADD_CSRF_TOKEN_FROM_COOKIE: JSON.stringify(true),
            HEADER_AUTH_TOKEN: JSON.stringify('Token 159fee651c44f38dde1592bf5df323a4a6c0c2eb')
          }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]
    };
    this.config.output.path = path.resolve('./out/preview/assets');
    this.config.devServer.hot = false;
    this.config.devServer.inline = false;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'preview';
  }
}

module.exports = WebpackDevConfig;
