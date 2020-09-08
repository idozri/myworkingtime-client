import moment from 'moment';
import produce from 'immer';
import {
    SET_END_DATE,
    SET_SHOW_DAYS_OFF,
    SET_SHOW_WORKDAYS,
    SET_START_DATE,
    SET_START_END_DATE,
    SORT_BY_DATE,
    SORT_BY_HOURS
} from '../actions/types';

// Filter Reducer
const filtersReducerDefaultState = {
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    showDaysOff: true,
    showWorkdays: true
};

export default (state = filtersReducerDefaultState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_END_DATE:
                draft.endDate = action.payload;
                break;
            case SET_SHOW_DAYS_OFF:
                draft.showDaysOff = !draft.showDaysOff;
                break;
            case SET_SHOW_WORKDAYS:
                draft.showWorkdays = !draft.showWorkdays;
                break;
            case SET_START_DATE:
                draft.startDate = action.payload;
                break;
            case SET_START_END_DATE:
                draft.startDate = action.payload.startDate;
                draft.endDate = action.payload.endDate;
                break;
            case SORT_BY_DATE:
                draft.sortBy = 'date';
                break;
            case SORT_BY_HOURS:
                draft.sortBy = 'hours';
                break;
        }
    });
