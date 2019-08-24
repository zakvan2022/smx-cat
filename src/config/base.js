/* eslint object-shorthand: "off", func-names: "off" */
// Settings configured here will be merged into the final config object.
export default {
  avatarDefault: 'img/avatar_default.svg',
  fetchMock: false,
  staticRoot: '',
  shouldPrintStacktrace: false,
  useTokenAuth: false,

  getAvatarDefault: function () {
    return `${this.staticRoot}/${this.avatarDefault}`;
  },

  buildStaticPath: function (frag) {
    return `${this.staticRoot}${frag}`;
  }
};
