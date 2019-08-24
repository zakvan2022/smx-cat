const dev = require('./Dev');
const dist = require('./Dist');
const staging = require('./Staging');
const test = require('./Test');
const preview = require('./Preview');

module.exports = {
  dev,
  dist,
  test,
  staging,
  preview
};
