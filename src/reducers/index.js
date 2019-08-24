import { combineReducers } from 'redux';
import courses from './courses';
import modules from './modules';
import lessons from './lessons';
import teams from './teams';
import status from './status';

const reducers = combineReducers({
    courses,
    modules,
    lessons,
    teams,
    status
});

export default reducers;