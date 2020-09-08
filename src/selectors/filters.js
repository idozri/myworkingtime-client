import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash.isequal';
import {
    allFiltersInputSelecor,
    showDaysOffInputSelecor,
    showWorkdaysInputSelecor
} from './inputSelectors';

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const selectAllFilters = createDeepEqualSelector(
    allFiltersInputSelecor,
    filters => filters
);

export const selectShowDaysOff = createDeepEqualSelector(
    showDaysOffInputSelecor,
    showDaysOff => showDaysOff
);

export const selectShowWorkdays = createDeepEqualSelector(
    showWorkdaysInputSelecor,
    showWorkdays => showWorkdays
);
