const path = require('path');

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');
const TerserPlugin = require('terser-webpack-plugin');

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map',
      entry: {
        app: [
          'whatwg-fetch',
          './index.js'
        ]
      },
      optimization: {
        minimizer: [new TerserPlugin()],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
            APP_ENV: JSON.stringify('dist'),
            ADD_DEV_ROUTES: JSON.stringify(true),
            ADD_LOGGER_MW: JSON.stringify(false),
            ADD_REDUX_DEV_TOOLS: JSON.stringify(false),
            SHOW_ENV_NOTICE: JSON.stringify(false),
            MOCK_API: JSON.stringify(false),
            USE_AUTH_TOKEN: JSON.stringify(false),
            ADD_CSRF_TOKEN_FROM_COOKIE: JSON.stringify(true)
          }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]
    };
    this.config.output.path = path.resolve('./out/dist/assets');
    this.config.devServer.hot = false;
    this.config.devServer.inline = false;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist';
  }
}

module.exports = WebpackDistConfig;
