
const modules = (state = { isLoading: false, error: '', data: [], selected:{} }, action) => {
    switch (action.type) {
      case 'REQUEST_MODULES_START':
        return {
          ...state,
          isLoading: true,
        };
      case 'REQUEST_MODULES_SUCCESS':
        return {
          ...state,
          isLoading: false,
          data: action.modules
        };
      case 'REQUEST_MODULE_DETAIL_SUCCESS':
        return {
          ...state,
          isLoading: false,
          selected: action.module
        }
      case 'REQUEST_MODULE_REMOVE':
        return {
          ...state,
          isLoading: false,
          selected: {course: state.selected.course?state.selected.course:null},
          data : [...state.data.filter((item)=>{return item.id!=action.id})]
        }
      case 'REQUEST_DESELECT_MODULE':
        return {
          ...state,
          selected: {}
        };
      case 'REQUEST_ADD_MODULE':
        return {
          ...state,
          selected: {course: action.id}
        };
      case 'REQUEST_MODULES_FAIL':
        return {
          ...state,
          isLoading: false,
          error: action.error
        };
       default:
         return state;
    }
  };
  
  export default modules;