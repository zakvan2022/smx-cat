import { FetchUtils } from "../utils/FetchUtils";
import { ApiUtils } from "../utils/ApiUtils";
import axios from 'axios';

/* TEAMs */
function requestTeamStart() {
    return {
      type: 'REQUEST_TEAM_START'
    };
}
function requestAddMember(member) {
    return {
      type: 'REQUEST_TEAM_ADD_MEMBER',
      member
    };
}
function requestGetList(team) {
    return {
      type: 'REQUEST_TEAM_GET_LIST',
      team
    };
}
function requestRemoveMember(id) {
    return {
      type: 'REQUEST_TEAM_REMOVE_MEMBER',
      id
    };
}

function requestTeamFail(error) {
    return {
      type: 'REQUEST_TEAM_FAIL',
      error
    };
}

export function getList(id) {
  return (dispatch, getState) => {
    dispatch(requestTeamStart());
    axios.get(ApiUtils.uriApiTeams(id), {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
    }).then((response) => {
      dispatch(requestGetList(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      dispatch(requestTeamFail(error));
    });
  };
}

export function create(payload) {
    console.log("***create team*****")
    console.log(payload);
  return (dispatch, getState) => {
    dispatch(requestTeamStart());
    axios.post(ApiUtils.uriApiTeams(payload.course), {...payload}, {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts(),
    }).then((response) => {
        console.log(response)
      dispatch(requestAddMember(response.data));
    })
    .catch((error) => {
        console.log(error)
      dispatch(requestTeamFail(error));
      dispatch(getList(payload.course));
    });
  };
}

export function remove(courseid, id) {
  return (dispatch, getState) => {
    dispatch(requestTeamStart());
    axios.delete(ApiUtils.uriApiRemoveTeams(courseid, id), {
      headers: FetchUtils.buildConfigRelatedHeaders(), ...FetchUtils.buildFetchOpts()
    }).then((response) => {
        console.log("Remove Successfully");
      dispatch(requestRemoveMember(id));
    })
    .catch((error) => {
      console.log(error);
      dispatch(requestTeamFail(error));
    //   dispatch(getList(courseid));
    });
  };
}