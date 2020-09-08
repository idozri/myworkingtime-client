import { SET_SEARCH_MONTH_DATE, SORT_MONTHS_BY_DATE } from './types';

// SORT_BT_HOURS
export const setSearchMonthDate = text => ({
    type: SET_SEARCH_MONTH_DATE,
    payload: text
});

// SORT BY_DATE
export const sortByDate = () => ({
    type: SORT_MONTHS_BY_DATE
});
