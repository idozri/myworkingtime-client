import { combineReducers } from 'redux';
import authReducer from './auth';
import dataReducer from './data';
import errorReducer from './error';
import filterReducer from './filters';
import monthFilterReducer from './monthFilters';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    error: errorReducer,
    filter: filterReducer,
    monthFilter: monthFilterReducer
});
