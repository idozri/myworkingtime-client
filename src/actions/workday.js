import moment from 'moment';
import axios from 'axios';
import { axiosConfig } from '../helpers/axiosConfig';
import { returnErrors, clearErrors } from './error';
import { ADD_WORKDAY, DELETE_WORKDAY, UPDATE_WORKDAY } from '../actions/types';
import { handleSuccessActions, handleErrors } from './helpers/dispatchHelper';

const api = process.env.API_URL;

// Add a worday to database and state
export const addWorkday = (workdayData = {}) => (dispatch, getState) => {
    const {
        date = null,
        timeIn = null,
        timeOut = null,
        note = '',
        isDayOff = false,
        owner
    } = workdayData;

    const workday = {
        date,
        timeIn,
        timeOut,
        note,
        isDayOff,
        owner
    };

    const token = getState().auth.token;

    // Request body
    const body = JSON.stringify(workday);

    //If success dispath worday to state or dispatch the error
    return axios
        .post(`${api}/workdays`, body, axiosConfig(token))
        .then(res => {
            handleSuccessActions(dispatch, ADD_WORKDAY, res.data);
            debugger;
            return res;
        })
        .catch(err => {
            handleErrors(dispatch, err);
            return { err: err.response ? err.response.data.msg : err.message };
        });
};

export const updateWorkday = ({ id, updates }) => (dispatch, getState) => {
    const token = getState().auth.token;
    // Request body
    const body = JSON.stringify(updates);

    //If success dispath user to state or dispatch the error
    return axios
        .patch(`${api}/workdays/${id}`, body, axiosConfig(token))
        .then(res => {
            handleSuccessActions(dispatch, UPDATE_WORKDAY, res.data);
            return res;
        })
        .catch(err => {
            handleErrors(dispatch, err);

            return { err: err.response ? err.response.data.msg : err.message };
        });
};

export const deleteWorkday = id => (dispatch, getState) => {
    const token = getState().auth.token;

    //If success dispath remove workday from state or dispatch the error
    return axios
        .delete(`${api}/workdays/${id}`, axiosConfig(token))
        .then(res => {
            handleSuccessActions(dispatch, DELETE_WORKDAY, res.data);
        })
        .catch(err => handleErrors(dispatch, err));
};
