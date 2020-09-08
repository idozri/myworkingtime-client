import produce from 'immer';
import { failedAction, loginSuccess, userLoaded } from './helpers/auth';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const authReducerInitialState = {
    // Get the token from local storage
    token: typeof window !== 'undefined' && localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export default (state = authReducerInitialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case USER_LOADING:
                // Set the isLoading state
                draft.isLoading = true;
                break;
            case USER_LOADED:
                // Auth is done
                userLoaded(draft, action.payload);
                break;
            case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
                loginSuccess(draft, action.payload);
                break;
            case AUTH_ERROR:
            case LOGIN_FAIL:
            case LOGOUT_SUCCESS:
            case REGISTER_FAIL:
                failedAction(draft);
                break;
        }
    });
