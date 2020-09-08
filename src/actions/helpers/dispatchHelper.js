import { returnErrors, clearErrors } from '../error';
import { normalize } from 'normalizr';
import { month } from '../schema';
import { LOGIN_SUCCESS, POPULATE_DATA, USER_LOADED } from '../types';

// Dispatch the error to state
export const handleErrors = (dispatch, err, id = null) => {
    const msg = err.response ? err.response.data : err;
    const status = err.response ? err.response.status : '500';

    // dispatch the error to state
    dispatch(returnErrors(msg, status, id));

    if (id) {
        // Dispatch the action to clear state
        dispatch({ type: id });
    }
};

export const handleSuccessActions = (dispatch, actionType, payload) => {
    // Clear Errors from state
    dispatch(clearErrors());

    // Dispatch data to state
    dispatch({
        type: actionType,
        payload
    });

    if (actionType === LOGIN_SUCCESS || actionType === USER_LOADED) {
        // Normilize the data
        const normalizedData = normalize(payload.months, [month]);

        // Dispatch data to state
        dispatch({
            type: POPULATE_DATA,
            payload: normalizedData
        });
    }
};
