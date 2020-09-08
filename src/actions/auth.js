import axios from 'axios';
import { handleSuccessActions, handleErrors } from './helpers/dispatchHelper';
import { axiosConfig } from '../helpers/axiosConfig';
import {
    AUTH_ERROR,
    CLEAR_DATA,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADING,
    USER_LOADED
} from '../actions/types';

const api = process.env.API_URL;

// Check token and load user
export const loadUser = token => {
    return async dispatch => {
        // User loading
        dispatch({ type: USER_LOADING });

        // If no token don't send request to database
        if (!token) {
            return Promise.resolve(false);
        }

        return axios
            .get(`${api}/users/me`, axiosConfig(token))
            .then(res =>
                // Dispatch user and data to state
                handleSuccessActions(dispatch, USER_LOADED, res.data)
            )
            .catch(err => {
                handleErrors(dispatch, err, AUTH_ERROR);
            });
    };
};

// Register user
export const register = ({ email, password }) => (dispatch, getState) => {
    const token = getState().auth.token;

    // User loading
    dispatch({ type: USER_LOADING });

    // Request body
    const body = JSON.stringify({ email, password });

    //If success dispath user to state or dispatch the error
    return axios
        .post(`${api}/users`, body, axiosConfig(token))
        .then(res => {
            debugger;
            // Dispatch user to state
            handleSuccessActions(dispatch, REGISTER_SUCCESS, res.data);

            return res.data;
        })
        .catch(err => {
            handleErrors(dispatch, err, REGISTER_FAIL);
            return err.response.data;
        });
};

// Login user
export const login = ({ email, password }) => dispatch => {
    // User loading
    dispatch({ type: USER_LOADING });

    // Request body
    const body = JSON.stringify({ email, password });
    //If success dispath user to state or dispatch the error
    return axios
        .post(`${api}/users/login`, body, axiosConfig())
        .then(res =>
            // Dispatch user and data to state
            handleSuccessActions(dispatch, LOGIN_SUCCESS, res.data)
        )
        .catch(err => handleErrors(dispatch, err, LOGIN_FAIL));
};

export const logout = () => (dispatch, getState) => {
    const token = getState().auth.token;
    //If success dispath user to state or dispatch the error
    return axios
        .post(`${api}/users/logout`, {}, axiosConfig(token))
        .then(res => {
            // Dispatch action to clear state
            handleSuccessActions(dispatch, LOGOUT_SUCCESS);
            // Clear data state
            dispatch({ type: CLEAR_DATA });
        })
        .catch(err => handleErrors(dispatch, err));
};
