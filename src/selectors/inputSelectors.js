// Filter input selector
export const allFiltersInputSelecor = state => state.filter;
export const showDaysOffInputSelecor = state => state.filter.showDaysOff;
export const showWorkdaysInputSelecor = state => state.filter.showWorkdays;

// Month filter input selector
export const allMonthFiltersInputSelecor = state => state.monthFilter;
export const monthSortAscFilterInputSelecor = state =>
    state.monthFilter.sortAsc;

// Month input selectors
export const visibleMonthIdInputSelector = state => state.data.activeMonthId;
export const monthsInputSelecor = state => state.data.months.byIds;
export const monthsIdsInputSelecor = state => state.data.months.allIds;

// Workdays input selectors
export const workdaysInputSelecor = state => state.data.workdays;
export const workdayByIdInputSelecor = (state, props) =>
    state.data.workdays[props.match.params.id];
