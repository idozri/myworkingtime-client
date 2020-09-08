import {
    SET_END_DATE,
    SET_SHOW_DAYS_OFF,
    SET_SHOW_WORKDAYS,
    SET_START_DATE,
    SET_START_END_DATE,
    SORT_BY_DATE,
    SORT_BY_HOURS
} from './types';

// SORT BY_DATE
export const sortByDate = () => ({
    type: SORT_BY_DATE
});

// SORT_BT_HOURS
export const sortByHours = () => ({
    type: SORT_BY_HOURS
});

// SET_SHOW_DAYS_OFF
export const setShowDaysOff = () => ({
    type: SET_SHOW_DAYS_OFF
});

// SET_SHOW_WORKDAYS
export const setShowWorkdays = () => ({
    type: SET_SHOW_WORKDAYS
});

// SET_END_DATE
export const setEndDate = endDate => ({
    type: SET_END_DATE,
    payload: endDate
});

// SET_START_DATE
export const setStartDate = startDate => ({
    type: SET_START_DATE,
    payload: startDate
});

// SET_START_END_DATE
export const setStartEndDate = dates => ({
    type: SET_START_END_DATE,
    payload: dates
});
