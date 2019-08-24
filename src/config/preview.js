import baseConfig from './base';

const config = {
  appEnv: 'preview',
  apiBaseUrl: 'http://127.0.0.1:8000/api',
  staticRoot: 'https://staging.skillmix.io/static/frontend',
  shouldPrintStacktrace: true,
  graphqlEndpoint: 'https://wc5zm7i6ireq5bj2mugrqbla3y.appsync-api.us-west-2.amazonaws.com/graphql',
  region: 'us-west-2',
  authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  UserPoolId: 'us-west-2_J5DCl18ZI',
  ClientId: 'a4f65ltae6vj4rmfmaeet5ecf'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
