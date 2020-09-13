import moment from 'moment';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash.isequal';
import {
    allMonthFiltersInputSelecor,
    monthsInputSelecor,
    monthsIdsInputSelecor,
    monthSortAscFilterInputSelecor,
    visibleMonthIdInputSelector
} from './inputSelectors';

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const selectAllMonths = createDeepEqualSelector(
    [monthsIdsInputSelecor, monthsInputSelecor],
    (monthsIds, months) => monthsIds.map(id => months[id])
);

export const selectVisibleMonth = createDeepEqualSelector(
    [visibleMonthIdInputSelector, monthsInputSelecor],
    (monthId, months) => months[monthId]
);

export const selectVisibleMonthDate = createDeepEqualSelector(
    [visibleMonthIdInputSelector, monthsInputSelecor],
    (monthId, months) => {
        try {
            return monthId && months[monthId].monthDate;
        } catch (e) {
            typeof window !== 'undefined' &&
                localStorage.removeItem('activeMonthId');
        }
    }
);

export const selectMonthById = monthId =>
    createDeepEqualSelector(monthsInputSelecor, months => months[monthId]);

export const selectActiveMonthId = createDeepEqualSelector(
    visibleMonthIdInputSelector,
    activeMonthId => activeMonthId
);

export const selectVisibleMonths = createDeepEqualSelector(
    [monthsInputSelecor, monthsIdsInputSelecor, allMonthFiltersInputSelecor],
    (months, monthIds, filters) => {
        const { sortAsc, searchMonthDate } = filters;

        const visibleMonthIds = monthIds.filter(id => {
            // Set month
            const month = months[id];
            // Set the month date
            const monthDate = moment(month.monthDate).format('MMMM, yyyy');

            // Check if month date contains the search text
            return monthDate.toLowerCase().includes(searchMonthDate);
        });

        const visibleWorkdays = visibleMonthIds
            .map(id => months[id])
            .sort((a, b) => {
                if (sortAsc) {
                    return a.monthDate < b.monthDate ? 1 : -1;
                }

                return a.monthDate > b.monthDate ? 1 : -1;
            });

        return visibleWorkdays;
    }
);

export const selectMonthSortAscFilter = createDeepEqualSelector(
    monthSortAscFilterInputSelecor,
    sortAsc => sortAsc
);
