//get all employees
import { FetchUtils } from "../utils/FetchUtils";
import { ApiUtils } from "../utils/ApiUtils";
import { handleResponse } from "../utils/helpers";
import axios from 'axios';

/* Courses */
function requestCoursesStart() {
    return {
      type: 'REQUEST_COURSES_START'
    };
}
export function requestCourseSuccess(course) {
    return {
      type: 'REQUEST_COURSE_DETAIL_SUCCESS',
      course
    };
}
function requestTeamsSuccess(team) {
  return {
    type: 'REQUEST_COURSE_TEAMS_SUCCESS',
    team
  };
}
function requestCoursesSuccess(courses) {
    return {
      type: 'REQUEST_COURSES_SUCCESS',
      courses
    };
}

function requestCoursesFail(error) {
    return {
      type: 'REQUEST_COURSES_FAIL',
      error
    };
}

export function requestEditToCourse() {
  return {
    type: 'REQUEST_EDIT_COURSE'
  };
}

export function getCourses() {
    return (dispatch, getState) => {
      dispatch(requestCoursesStart());
      axios.get(ApiUtils.uriApiCourses(), {
        headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
      }).then((response) => {
        dispatch(requestCoursesSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(requestCoursesFail(error));
      });
    };
}

export function getTeams(id) {
  return (dispatch, getState) => {
    dispatch(requestCoursesStart());
    axios.get(ApiUtils.uriApiTeams(id), {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
    }).then((response) => {
      console.log(response.data);
      dispatch(requestTeamsSuccess(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(requestCoursesFail(error));
    });
  };
}

export function get(id) {
    return (dispatch, getState) => {
      dispatch(requestCoursesStart());
      axios.get(ApiUtils.uriApiCourseInfo(id), {
        headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
      }).then((response) => {
        dispatch(requestCourseSuccess(response.data));
      })
      .catch((error) => {
        if (id=="null") id=null;
        dispatch(requestCourseSuccess({id: id}));
        dispatch(requestCoursesFail(error));
      });
    };
}


export function create(payload) {
  return (dispatch, getState) => {
    dispatch(requestCoursesStart());
    axios.post(ApiUtils.uriApiCreateCourse(), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
    }).then((response) => {
      dispatch(requestCourseSuccess(response.data));
    })
    .catch((error) => {
      dispatch(requestCoursesFail(error));
    });
  };
}

export function update(id, payload) {
  return (dispatch, getState) => {
    dispatch(requestCoursesStart());
    axios.put(ApiUtils.uriApiCourseInfo(id), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
      dispatch(requestCourseSuccess(response.data));
    })
    .catch((error) => {
      dispatch(requestCoursesFail(error));
    });
  };
}

export function remove(id) {
  return (dispatch, getState) => {
    dispatch(requestCoursesStart());
    axios.delete(ApiUtils.uriApiCourseInfo(id), {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
      dispatch(requestCourseSuccess({}));
      window.location.href="/";
    })
    .catch((error) => {
      // window.alert("You can't remove this course");
      dispatch(requestCoursesFail(error));
    });
  };
}