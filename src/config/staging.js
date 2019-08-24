import baseConfig from './base';

const config = {
  appEnv: 'staging',
  apiBaseUrl: 'https://staging.skillmix.io/api',
  staticRoot: 'https://staging.skillmix.io/static/frontend',
  shouldPrintStacktrace: true,
};

export default Object.freeze(Object.assign({}, baseConfig, config));
