import baseConfig from './base';

const config = {
  appEnv: 'dist',
  apiBaseUrl: 'https://skillmix.io/api',
  staticRoot: 'https://skillmix.io/static/frontend',
  shouldPrintStacktrace: false,
};

export default Object.freeze(Object.assign({}, baseConfig, config));
