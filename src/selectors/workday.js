import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash.isequal';
import moment from 'moment';
import {
    allFiltersInputSelecor,
    monthsInputSelecor,
    workdaysInputSelecor,
    workdayByIdInputSelecor,
    visibleMonthIdInputSelector
} from './inputSelectors';
import { selectVisibleMonth } from './month';

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const selectVisibleMonthWorkdayIds = createDeepEqualSelector(
    selectVisibleMonth,
    month => {
        // Return all workdays keys for the current month
        if (month && month.workdays) return month.workdays;
        // Else return an empty array
        return [];
    }
);

export const selectVisibleWorkdays = createDeepEqualSelector(
    [
        selectVisibleMonthWorkdayIds,
        workdaysInputSelecor,
        allFiltersInputSelecor
    ],
    (workdayIds, workdays, filters) => {
        const {
            sortBy,
            startDate,
            endDate,
            showDaysOff,
            showWorkdays
        } = filters;

        const visibleWorkdayIds = workdayIds.filter(id => {
            // Set workday
            const workday = workdays[id];

            // Set the workday date
            const workdayDate = moment(workday.date);

            // Check if the workday date is before/after the start day filetr
            const startDateMatch = startDate
                ? startDate.isSameOrBefore(workdayDate, 'day')
                : true;
            const endDateMatch = endDate
                ? endDate.isSameOrAfter(workdayDate, 'day')
                : true;
            // Check if is day off is true
            if (workday.isDayOff) {
                // Check if filter show days off is true
                // And startDateMatch endDateMatch are ture
                return showDaysOff && startDateMatch && endDateMatch;
            }

            // Check if is day off is false and filter show workdays is true
            const workdaysMatch = showWorkdays && !workday.isDayOff;

            // If start and end date has macth return the workday
            return startDateMatch && endDateMatch && workdaysMatch;
        });

        const visibleWorkdays = visibleWorkdayIds
            .map(id => workdays[id])
            .sort((a, b) => {
                if (sortBy === 'date') {
                    return a.date < b.date ? 1 : -1;
                } else if (sortBy === 'hours') {
                    return a.totalHours < b.totalHours ? 1 : -1;
                }
            });

        return visibleWorkdays;
    }
);

export const selectWorkdaysArrayLength = createDeepEqualSelector(
    [visibleMonthIdInputSelector, monthsInputSelecor],
    (monthId, months) => {
        const workdaysIds = months[monthId].workdays;
        return workdaysIds ? workdaysIds.length : 0;
    }
);

// Select workday by id
export const selectWorkday = createDeepEqualSelector(
    [workdayByIdInputSelecor],
    workday => workday
);

// Select the total hours for the visibale workdays
export const selectVisibaleWorkdaysTotalHours = createDeepEqualSelector(
    [selectVisibleWorkdays],
    workdays => {
        return workdays.reduce((a, b) => a + (b['totalHours'] || 0), 0);
    }
);
