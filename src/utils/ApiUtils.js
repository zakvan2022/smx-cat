import isBlank                    from 'underscore.string/isBlank';
import config                     from 'config';

const BASE_URL = config.apiBaseUrl;


export class ApiUtils {

  /**
   * @param {string} url
   * @return {string}
   */
  static buildUrlWithProtocol(url) {
    let cleanedUrl;
    cleanedUrl = url.replace('api/', ''); // eslint-disable-line
    return `${config.apiBaseUrl}${cleanedUrl}`;
  }

  /**
   * @return {string}
   */
  static uriApiCourses() {
    return `${BASE_URL}/cat/builder/course`;
  }
    /**
   * @return {string}
   */
  static uriApiCreateCourse() {
    return `${BASE_URL}/cat/builder/course`;
  }
    /**
   * @param {string} id
   * @return {string}
   */
  static uriApiCourseInfo(id) {
    return `${BASE_URL}/cat/builder/course/${id}`;
  }
     /**
   * @param {string} id
   * @return {string}
   */
  static uriApiTeams(courseid) {
    return `${BASE_URL}/cat/builder/course/${courseid}/team/`;
  }
       /**
   * @param {string} id
   * @return {string}
   */
  static uriApiRemoveTeams(courseid, id) {
    return `${BASE_URL}/cat/builder/course/${courseid}/team/${id}`;
  }
    /**
   * @param {string} id
   * @return {string}
   */
  static uriApiModules(id) {
    return `${BASE_URL}/cat/builder/course/${id}/module/`;
  }
     /**
   * @param {string} id
   * @return {string}
   */
  static uriApiModule(id) {
    return `${BASE_URL}/cat/builder/module/${id}`;
  }
  /**
   * @param {string} id
   * @return {string}
   */
  static uriApiLessonDetail(id) {
    return `${BASE_URL}/cat/builder/page/${id}`;
  }
    /**
   * @param {string} id
   * @return {string}
   */
  static uriApiLessonSearch(keyword){
    return `${BASE_URL}/cat/builder/page/?search=${keyword}`;
  }
  /**
   * @param {string} id
   * @return {string}
   */
  static uriApiUpdatedLesson(id) {
    return `${BASE_URL}/cat/builder/page/${id}`;
  }
  /**
   * @param {string} id
   * @return {string}
   */
  static uriApiCreatedLesson() {
    return `${BASE_URL}/cat/builder/page/`;
  }
  
  /**
   * Returns the URL to the course detail endpoint.
   *
   * @param {string} courseSlug
   * @param {string|number} courseId
   * @return {string}
   */
  static uriApiCourseDetail(courseSlug, courseId) {
    return `${BASE_URL}/courses/${courseSlug}-${courseId.toString()}/`;
  }

  /**
   * @param {string} searchString
   * @param {number} filterString
   * @return {string}
   */
  static uriCourseSearch(searchString, filterString) {

    const searchParam = isBlank(searchString)
      ? ''
      : `search=${encodeURIComponent(searchString)}`;

    const filterParam = isBlank(filterString)
      ? ''
      : `filter=${encodeURIComponent(searchString)}`;

    return searchString || filterString
      ? `${BASE_URL}/course/search/?${filterParam}&${searchParam}`
      : `${BASE_URL}/course/search/`;
  }

}
