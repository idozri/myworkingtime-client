import { createSelector } from 'reselect';

const getError = state => state.error;

export const selectErrorMsg = createSelector([getError], error => error.msg);
