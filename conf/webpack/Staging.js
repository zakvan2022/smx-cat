const path = require('path');

/**
 * Default dev server configuration.
 */
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
            NODE_ENV: JSON.stringify('production'),
            APP_ENV: JSON.stringify('staging'),
            ADD_DEV_ROUTES: JSON.stringify(true),
            ADD_LOGGER_MW: JSON.stringify(false),
            ADD_REDUX_DEV_TOOLS: JSON.stringify(false),
            SHOW_ENV_NOTICE: JSON.stringify(true),
            MOCK_API: JSON.stringify(false),
            USE_AUTH_TOKEN: JSON.stringify(false),
            ADD_CSRF_TOKEN_FROM_COOKIE: JSON.stringify(true)
          }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]
    };
    this.config.output.path = path.resolve('./out/staging/assets');
    this.config.devServer.hot = false;
    this.config.devServer.inline = false;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'staging';
  }
}

module.exports = WebpackDevConfig;
