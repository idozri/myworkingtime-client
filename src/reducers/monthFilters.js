import moment from 'moment';
import produce from 'immer';
import { SET_SEARCH_MONTH_DATE, SORT_MONTHS_BY_DATE } from '../actions/types';

// Filter Reducer
const filtersReducerDefaultState = {
    sortAsc: true,
    searchMonthDate: ''
};

export default (state = filtersReducerDefaultState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_SEARCH_MONTH_DATE:
                draft.searchMonthDate = action.payload.toLowerCase();
                break;
            case SORT_MONTHS_BY_DATE:
                draft.sortAsc = !draft.sortAsc;
                break;
            // case SET_END_DATE:
            //     draft.endDate = action.payload;
            //     break;
            // case SET_SHOW_DAYS_OFF:
            //     draft.showDaysOff = !draft.showDaysOff;
            //     break;
            // case SET_SHOW_WORKDAYS:
            //     draft.showWorkdays = !draft.showWorkdays;
            //     break;
            // case SET_START_DATE:
            //     draft.startDate = action.payload;
            //     break;
            // case SET_START_END_DATE:
            //     draft.startDate = action.payload.startDate;
            //     draft.endDate = action.payload.endDate;
            //     break;
            // case SORT_BY_DATE:
            //     draft.sortBy = 'date';
            //     break;
            // case SORT_BY_HOURS:
            //     draft.sortBy = 'hours';
            //     break;
        }
    });
