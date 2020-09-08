import axios from 'axios';
import { axiosConfig } from '../helpers/axiosConfig';
import { handleSuccessActions, handleErrors } from './helpers/dispatchHelper';
import {
    ADD_MONTH,
    CLEAR_DATA,
    DATABASE_FAIL,
    DELETE_MONTH,
    SET_ACTIVE_MONTH,
    UPDATE_MONTH
} from '../actions/types';

const api = process.env.API_URL;

export const clearData = () => ({
    type: CLEAR_DATA
});

// Set active month workdays state
export const setActiveMonth = monthId => ({
    type: SET_ACTIVE_MONTH,
    payload: monthId
});

export const addMonth = month => (dispatch, getState) => {
    const token = getState().auth.token;

    // Request body
    const body = JSON.stringify(month);
    return axios
        .post(`${api}/months`, body, axiosConfig(token))
        .then(res => {
            handleSuccessActions(dispatch, ADD_MONTH, res.data.month);
        })
        .catch(err => handleErrors(dispatch, err, DATABASE_FAIL));
};

export const updateMonth = month => (dispatch, getState) => {
    const token = getState().auth.token;
    // Request body
    const body = JSON.stringify(month.body);

    return axios
        .patch(`${api}/months/${month._id}`, body, axiosConfig(token))
        .then(res => {
            handleSuccessActions(dispatch, UPDATE_MONTH, res.data);
        })
        .catch(err => handleErrors(dispatch, err, DATABASE_FAIL));
};

export const deleteMonth = id => (dispatch, getState) => {
    const token = getState().auth.token;

    return axios
        .delete(`${api}/months/${id}`, axiosConfig(token))
        .then(res => {
            handleSuccessActions(dispatch, DELETE_MONTH, id);
        })
        .catch(err => {
            debugger;
            handleErrors(dispatch, err, DATABASE_FAIL);
        });
};
