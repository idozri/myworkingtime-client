import produce from 'immer';
import { addWorkday, updateWorkday, deleteWorkday } from './helpers/workday';
import {
    addMonth,
    deleteMonth,
    setActiveMonth,
    updateMonth
} from './helpers/month';
import {
    ADD_MONTH,
    ADD_WORKDAY,
    CLEAR_DATA,
    DELETE_MONTH,
    DELETE_WORKDAY,
    POPULATE_DATA,
    SET_ACTIVE_MONTH,
    UPDATE_MONTH,
    UPDATE_WORKDAY
} from '../actions/types';

const isBroswer = typeof window !== 'undefined';

const dataReducerInitialState = {
    months: {
        byIds: {},
        allIds: []
    },
    workdays: {},
    activeMonthId: isBroswer && localStorage.getItem('activeMonthId')
};

const populateData = (
    draft,
    { entities: { months, workdays }, result: ids }
) => {
    if (months) {
        // Set the moths and the workdays
        draft.months = { byIds: months, allIds: ids };
        draft.workdays = workdays ? workdays : {};

        // Check if there is an active month
        if (!draft.activeMonthId) {
            // Set the active month id in local storage
            const monthId = months[ids[0]]._id;
            draft.activeMonthId = monthId;
            isBroswer && localStorage.setItem('activeMonthId', monthId);
        }
    }
};

const clearData = draft => {
    // Reset the state
    draft.months = {
        byIds: {},
        allIds: []
    };

    draft.workdays = {};

    draft.activeMonthId = null;

    // Remove the active month id from the local storage
    isBroswer && localStorage.removeItem('activeMonthId');
};

export default (state = dataReducerInitialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case POPULATE_DATA:
                populateData(draft, action.payload);
                break;
            case ADD_WORKDAY:
                addWorkday(draft, action.payload);
                break;
            case UPDATE_WORKDAY:
                updateWorkday(draft, action.payload);
                break;
            case DELETE_WORKDAY:
                deleteWorkday(draft, action.payload);
                break;
            case ADD_MONTH:
                addMonth(draft, action.payload);
                break;
            case SET_ACTIVE_MONTH:
                setActiveMonth(draft, action.payload);
                break;
            case UPDATE_MONTH:
                updateMonth(
                    draft,
                    action.payload.month,
                    action.payload.workdays
                );
                break;
            case DELETE_MONTH:
                deleteMonth(draft, action.payload);
                break;
            case CLEAR_DATA:
                clearData(draft);
                break;
        }
    });
