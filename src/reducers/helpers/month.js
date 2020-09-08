import moment from 'moment';
import { normalize } from 'normalizr';
import { workday, month } from '../../actions/schema';

const isBroswer = typeof window !== 'undefined';

export const addMonth = (draft, month) => {
    // Add month to state
    draft.months.byIds[month._id] = month;

    // Add the month id to the month ids array
    draft.months.allIds.push(month._id);

    // Set the month as the active month
    setActiveMonth(draft, month._id);
};

export const setActiveMonth = (draft, monthId) => {
    isBroswer && localStorage.setItem('activeMonthId', monthId);
    draft.activeMonthId = monthId;
};

export const deleteMonth = (draft, monthId) => {
    if (draft.months.byIds[monthId].workdays.length > 0)
        // Delete all workdays of the deleted month
        draft.months.byIds[monthId].workdays.forEach(
            id => delete draft.workdays[id]
        );

    // Delete the month id from the ids array
    // If draft.months.allIds === 0 (undefined) set to an empty array
    draft.months.allIds = draft.months.allIds.filter(id => id !== monthId);

    // Delete the month
    delete draft.months.byIds[monthId];

    // Remove the active month id from localstorage
    isBroswer && localStorage.removeItem('activeMonthId');

    // If there in another month, set the first month is the array as the active month
    if (draft.months.allIds.length > 0) {
        setActiveMonth(draft, draft.months.allIds[0]);
    }

    // If the deleted month was the active month
    // delete the month id from the local storage
    if (draft.activeMonthId === monthId) {
        isBroswer && localStorage.removeItem('activeMonthId');
        draft.activeMonthId = null;
    }
};

export const updateMonth = (draft, month, workdays) => {
    // Get the month from the immer draft state
    const draftMonth = draft.months.byIds[month._id];

    // Get the workday ids array from the draft state
    const workdayIds = draft.months.byIds[month._id].workdays;

    // Update the month object
    draft.months.byIds[month._id] = { ...month, workdays: workdayIds };

    // If there are workdays for these month
    // And the month date is different from the month state date
    // Update the date for all the month workdays
    const shouldUpdateWordays = month.monthDate !== draftMonth.monthDate;

    if (shouldUpdateWordays && workdays) {
        const normalizedWorkdays = normalize(workdays, [workday]);

        // Update the workdays month
        workdayIds.forEach(
            id =>
                (draft.workdays[id] = normalizedWorkdays.entities.workdays[id])
        );
    }
};
