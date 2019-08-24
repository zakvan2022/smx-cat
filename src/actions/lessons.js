//get all employees
import { FetchUtils } from "../utils/FetchUtils";
import { ApiUtils } from "../utils/ApiUtils";
import axios from 'axios';
import * as action_modules from "../actions/modules";
function requestLessonsStart() {
  return {
    type: 'REQUEST_LESSONS_START'
  };
}

/* Lessons */
function requestLessonSuccess(lesson) {
  return {
    type: 'REQUEST_LESSON_DETAIL_SUCCESS',
    lesson
  };
}
function requestRemoveLesson(id){
  return {
    type: 'REQUEST_LESSON_REMOVE',
    id
  };
}
function requestLessonsFail(error) {
  return {
    type: 'REQUEST_LESSONS_FAIL',
    error
  };
}

export function requestAddLesson(id) {
  // id is module id
  return {
    type: 'REQUEST_ADD_LESSON',
    id
  };
}
export function requestEditToLesson() {
  return {
    type: 'REQUEST_EDIT_LESSON'
  };
}
export function requestDeselectLesson() {
  return {
    type: "REQUEST_DESELECT_LESSON"
  }
}

export function get(id) {
  return (dispatch, getState) => {
    dispatch(requestLessonsStart());
    axios.get(ApiUtils.uriApiLessonDetail(id), {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
    }).then((response) => {
      dispatch(requestEditToLesson());
      dispatch(requestLessonSuccess(response.data));
    })
    .catch((error) => {
      dispatch(requestLessonsFail(error));
    });
  };
}

export function create(payload, courseid) {
  return (dispatch, getState) => {
    dispatch(requestLessonsStart());
    axios.post(ApiUtils.uriApiCreatedLesson(), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
    }).then((response) => {
      dispatch(requestLessonSuccess(response.data));
      if (courseid) dispatch(action_modules.getModuleList(courseid));
    })
    .catch((error) => {
      dispatch(requestLessonsFail(error));
      if (courseid) dispatch(action_modules.getModuleList(courseid));
    });
  };
}

export function update(id, payload, courseid) {
  return (dispatch, getState) => {
    dispatch(requestLessonsStart());
    axios.put(ApiUtils.uriApiUpdatedLesson(id), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
      dispatch(requestLessonSuccess(response.data));
      if (courseid) dispatch(action_modules.getModuleList(courseid));
    })
    .catch((error) => {
      dispatch(requestLessonsFail(error));
      if (courseid) dispatch(action_modules.getModuleList(courseid));
    });
  };
}

export function remove(id, courseid) {
  return (dispatch, getState) => {
    dispatch(requestLessonsStart());
    axios.delete(ApiUtils.uriApiUpdatedLesson(id), {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
      dispatch(requestRemoveLesson(id));
      if (courseid) dispatch(action_modules.getModuleList(courseid));
    })
    .catch((error) => {
      dispatch(requestLessonsFail(error));
    });
  };
}

export function order(id, payload) {
  return (dispatch, getState) => {
    dispatch(requestLessonsStart());
    axios.put(ApiUtils.uriApiUpdatedLesson(id), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
    })
    .catch((error) => {
      dispatch(requestLessonsFail(error));
    });
  };
}