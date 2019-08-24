
/**
 * Webpack configuration base class
 */
const path = require('path');
const npmBase = path.join(__dirname, '../../node_modules');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');

class WebpackBaseConfig {

  constructor() {
    this._config = {};
  }

  /**
   * Get the list of included packages
   * @return {Array} List of included packages
   */
  get includedPackages() {
    return [].map((pkg) => path.join(npmBase, pkg));
  }

  /**
   * Set the config data.
   * This will always return a new config
   * @param {Object} data Keys to assign
   * @return {Object}
   */
  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data);
    return this._config;
  }

  /**
   * Get the global config
   * @param {Object} config Final webpack config
   */
  get config() {
    return this._config;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dev';
  }

  /**
   * Get the absolute path to src directory
   * @return {String}
   */
  get srcPathAbsolute() {
    return path.resolve('./src');
  }

  /**
   * Get the absolute path to tests directory
   * @return {String}
   */
  get testPathAbsolute() {
    return path.resolve('./test');
  }

  get commonsChunk() {
    return {
      plugin: new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: Infinity
      }),
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-router',
          'lodash',
          'immutable'
        ]
      }
    };
  }

  get dashboardPlugin() {
    return new DashboardPlugin();
  }

  /**
   * Get the default settings
   * @return {Object}
   */
  get defaultSettings() {
    return {
      context: this.srcPathAbsolute,
      devtool: 'eval',
      devServer: {
        contentBase: './src/',
        publicPath: '/assets/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8080
      },
      entry: { app: './src/index.js' },
      module: {
        rules: [
          {
            test: /\.cssmodule\.css$/,
            loaders: [
              'style-loader',
              'css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]'
            ]
          },
          {
            test: /^.((?!cssmodule).)*\.css$/,
            loaders: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.(sass|scss)$/,
            loaders: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.cssmodule\.less$/,
            loaders: [
              'style-loader',
              'css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]',
              'less-loader'
            ]
          },
          {
            test: /^.((?!cssmodule).)*\.less$/,
            loaders: [
              'style-loader',
              'css-loader',
              'less-loader'
            ]
          },
          {
            test: /\.styl$/,
            loaders: [
              'style-loader',
              'css-loader',
              'stylus-loader'
            ]
          },
          {
            test: /\.(ttf|eot|svg)$/,
            use: {
              loader: 'file-loader',
              options: {
                name: 'fonts/[hash].[ext]'
              }
            }
          },
          {
            test: /\.(woff|woff2)$/,
            use: {
              loader: 'url-loader',
              options: {
                name: 'fonts/[hash].[ext]',
                limit: 5000,
                mimetype: 'application/font-woff'
              }
            }
          },
          {
            test: /\.(png|jpg|gif|mp4|ogg)$/,
            loaders: ['file-loader']
          },
          {
            test: /\.(js|jsx)$/,
            include: [].concat(
              this.includedPackages,
              [this.srcPathAbsolute]
            ),
            loaders: ['babel-loader']
          }
        ]
      },
      output: {
        path: path.resolve('./dist/assets'),
        filename: '[name].js',
        publicPath: '/assets/'
      },
      plugins: [
        new webpack.LoaderOptionsPlugin({
          debug: true
        })
      ],
      resolve: {
        alias: {
          actions: `${this.srcPathAbsolute}/actions/`,
          components: `${this.srcPathAbsolute}/components/`,
          config: `${this.srcPathAbsolute}/config/${this.env}.js`,
          constants: `${this.srcPathAbsolute}/constants/`,
          decorators: `${this.srcPathAbsolute}/decorators/`,
          fixtures: `${this.srcPathAbsolute}/fixtures/`,
          images: `${this.srcPathAbsolute}/images/`,
          layouts: `${this.srcPathAbsolute}/layouts/`,
          records: `${this.srcPathAbsolute}/records/`,
          reducers: `${this.srcPathAbsolute}/reducers/`,
          styles: `${this.srcPathAbsolute}/styles/`,
          utils: `${this.srcPathAbsolute}/utils/`
        },
        extensions: ['.js', '.jsx'],
        modules: [
          this.srcPathAbsolute,
          'node_modules'
        ]
      }
    };
  }
}

module.exports = WebpackBaseConfig;
