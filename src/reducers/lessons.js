
const lessons = (state = { isLoading: false, error: '', selected: {} }, action) => {
    switch (action.type) {
      case 'REQUEST_LESSONS_START':
        return {
          ...state,
          isLoading: true,
        };
      case 'REQUEST_LESSON_DETAIL_SUCCESS':
        return {
          ...state,
          isLoading: false,
          selected: action.lesson
        };
      case 'REQUEST_LESSON_REMOVE':
        return {
          ...state,
          isLoading: false,
          selected: {module: state.selected.module?state.selected.module:null},
        }
      case 'REQUEST_LESSONS_FAIL':
        return {
          ...state,
          isLoading: false,
          error: action.error
        };
      case 'REQUEST_DESELECT_LESSON':
        return {
          ...state,
          selected: {}
        };
      case 'REQUEST_ADD_LESSON':
        return {
          ...state,
          isLoading: false,
          selected: {module: action.id}
        }
       default:
         return state;
    }
  };
  
  export default lessons;