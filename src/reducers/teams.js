
const teams = (state = { isLoading: false, error: '', selected: {}, list: [] }, action) => {
    switch (action.type) {
      case 'REQUEST_TEAM_START':
        return {
          ...state,
          isLoading: true,
        };
      case 'REQUEST_TEAM_ADD_MEMBER':
        return {
            ...state,
            isLoading: false,
            selected: action.member,
            list: [state.list, member]
        };
      case 'REQUEST_TEAM_GET_LIST':
        return {
            ...state,
            isLoading: false,
            list: action.team,
        };
      case 'REQUEST_TEAM_REMOVE_MEMBER':
        return {
          ...state,
          isLoading: false,
          list: [...state.list.filter(item=>item.user&&item.user.id!=action.id)]
        };
      case 'REQUEST_TEAM_FAIL':
        return {
          ...state,
          isLoading: false,
          error: action.error
        };
       default:
         return state;
    }
  };
  
  export default teams;