/* eslint dot-notation: 0 */
import Cookie from 'js-cookie';

/**
 * Provides utility function arond fetching remote data.
 */
export class FetchUtils {

  /**
   * @param {string|number} id
   * @param {Immutable.Set<*>} loading
   * @return {boolean}
   */
  static isLoading(id, loading) {
    return loading.some(x => x === id);
  }

  static buildConfigRelatedHeaders()  {
    const headers = {};

    headers['Accept']        = 'application/json';          // eslint-disable-line
    headers['Content-Type']  = 'application/json';          // eslint-disable-line

    if (process.env.USE_AUTH_TOKEN) {
      headers['Authorization'] = process.env.HEADER_AUTH_TOKEN;
    }

    if (process.env.ADD_CSRF_TOKEN_FROM_COOKIE) {
      headers['X-CSRFToken'] = FetchUtils.getCsrfToken();
    }

    return headers;
  }

  static buildFetchOpts() {
    const opts = {};

    if (process.env.APP_ENV === 'staging' || process.env.APP_ENV === 'dist') {
      opts.credentials = 'same-origin';
    }

    return opts;
  }

  /**
   * @return {string}
   */
  static getCsrfToken() {
    return Cookie.get('csrftoken');
  }
}
