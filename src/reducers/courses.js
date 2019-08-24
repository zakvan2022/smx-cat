
const courses = (state = { isLoading: false, error: '', data: []/* ,flag:false */, selected: {}, team: []}, action) => {
    switch (action.type) {
      case 'REQUEST_COURSES_START':
        return {
          ...state,
          isLoading: true,
        };
      case 'REQUEST_COURSE_DETAIL_SUCCESS':
        return {
          ...state,
          isLoading: false,
          selected: action.course
        };
      case 'REQUEST_COURSES_SUCCESS':
        return {
          ...state,
          isLoading: false,
          data: action.courses
        };
      case 'REQUEST_COURSE_TEAMS_SUCCESS':
        return {
          ...state,
          isLoading: false,
          team: action.team
        };
      case 'REQUEST_COURSES_FAIL':
        return {
          ...state,
          isLoading: false,
          error: action.error
        };
       default:
         return state;
    }
  };
  
  export default courses;