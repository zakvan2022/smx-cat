import baseConfig from './base';

const config = {
  appEnv: 'test',
  apiBaseUrl: 'http://api.domain',
};

export default Object.freeze(Object.assign({}, baseConfig, config));
