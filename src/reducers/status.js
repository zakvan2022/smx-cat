
const status = (state = {whatfor: 'MODULE', submenu: null}, action) => {
    switch (action.type) {
      case 'REQUEST_EDIT_MODULE':
        return {
          ...state,
          whatfor: "MODULE",
        };
      case 'REQUEST_EDIT_LESSON':
        return {
          ...state,
          whatfor: "LESSON",
        };
      case 'REQUEST_EDIT_COURSE':
        return {
          ...state,
          whatfor: "COURSES",
        };
       default:
         return state;
    }
  };
  export default status;