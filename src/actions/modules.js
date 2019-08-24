//get all employees
import { FetchUtils } from "../utils/FetchUtils";
import { ApiUtils } from "../utils/ApiUtils";
import axios from 'axios';

/* Modules */
function requestModulesStart() {
  return {
    type: 'REQUEST_MODULES_START'
  };
}

function requestModulesSuccess(modules) {
  return {
    type: 'REQUEST_MODULES_SUCCESS',
    modules
  };
}
/* Lessons */
function requestModuleSuccess(module) {
  return {
    type: 'REQUEST_MODULE_DETAIL_SUCCESS',
    module
  };
}
function requestRemoveModule(id) {
  return {
    type: 'REQUEST_MODULE_REMOVE',
    id
  };
}
function requestModulesFail(error) {
  return {
    type: 'REQUEST_MODULES_FAIL',
    error
  };
}
export function requestAddModule(id) {
  // id is module id
  return {
    type: 'REQUEST_ADD_MODULE',
    id
  };
}
export function requestEditToModule() {
  return {
    type: 'REQUEST_EDIT_MODULE'
  };
}

export function requestDeselectModule() {
  return {
    type: "REQUEST_DESELECT_MODULE"
  }
}
export function getModuleList(index) {
  console.log("get Module List");
  console.log(index);
  return (dispatch, getState) => {
    dispatch(requestModulesStart());
    axios.get(ApiUtils.uriApiModules(index), {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
    }).then((response) => {
      console.log(response.data.results);
      dispatch(requestModulesSuccess(response.data.results));
    })
    .catch((error) => {
      dispatch(requestModulesFail(error));
    });
  };
}

export function get(id) {
    return (dispatch, getState) => {
      dispatch(requestModulesStart());
      axios.get(ApiUtils.uriApiModule(id), {
        headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
      }).then((response) => {      
        dispatch(requestEditToModule());
        dispatch(requestModuleSuccess(response.data));
      })
      .catch((error) => {
        dispatch(requestModulesFail(error));
      });
    };
}
export function create(payload, courseid) {
  return (dispatch, getState) => {
    dispatch(requestModulesStart());
    axios.post(ApiUtils.uriApiModules(payload.course), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
    }).then((response) => {
      dispatch(requestModuleSuccess(response.data));
      dispatch(getModuleList(courseid));
    })
    .catch((error) => {
      dispatch(requestModulesFail(error));
      dispatch(getModuleList(courseid));
    });
  };
}
export function update(id, payload, courseid) {
  return (dispatch, getState) => {
    dispatch(requestModulesStart());
    axios.put(ApiUtils.uriApiModule(id), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
      dispatch(requestModuleSuccess(response.data));
      dispatch(getModuleList(courseid));
    })
    .catch((error) => {
      dispatch(requestModulesFail(error));
      dispatch(getModuleList(courseid));
    });
  };
}

export function remove(id,courseid) {
  return (dispatch, getState) => {
    console.log("REMOVE MODULE");
    dispatch(requestModulesStart());
    axios.delete(ApiUtils.uriApiModule(id), {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
      dispatch(requestRemoveModule(id));
      dispatch(getModuleList(courseid));
    })
    .catch((error) => {
      dispatch(requestModulesFail(error));
      dispatch(getModuleList(courseid));
    });
  };
}

export function order(id, payload) {
  return (dispatch, getState) => {
    dispatch(requestModulesStart());
    axios.put(ApiUtils.uriApiModule(id), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
    })
    .catch((error) => {
      dispatch(requestModulesFail(error));
    });
  };
}
