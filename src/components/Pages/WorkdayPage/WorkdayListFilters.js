import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    FormControlLabel,
    Grid,
    MenuItem,
    Select,
    Switch
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
    sortByDate,
    sortByHours,
    setEndDate,
    setShowDaysOff,
    setShowWorkdays,
    setStartDate,
    setStartEndDate
} from 'actions/filters';
import {
    selectShowDaysOff,
    selectShowWorkdays,
    selectAllFilters
} from 'selectors/filters';
import { selectVisibleMonth } from 'selectors/month';

export const WorkdayListFilters = props => {
    const monthDate = props.monthDate;

    // Set defaults for the filters
    const [showDaysOff, setShowDaysOff] = useState(props.showDaysOff);
    const [showWorkdays, setShowWorkdays] = useState(props.showWorkdays);

    // On date change send dispatch
    const handleFromDateChange = startDate => {
        props.setStartDate(startDate);
    };
    // On date change send dispatch
    const handleToDateChange = endDate => {
        props.setEndDate(endDate);
    };

    // On date calendar focus change set the local state
    const handleFocusChange = calendarFocused =>
        setCalendarFocused(calendarFocused);

    // On sort change send dispatch
    const handleSortChange = e => {
        const filter = e.target.value;

        if (filter === 'date') {
            props.sortByDate(sortByDate());
        } else if (filter === 'hours') {
            props.sortByHours(sortByHours());
        }
    };

    // On show days off change send dispatch
    const handleShowDaysOffChange = () => {
        setShowDaysOff(!showDaysOff);
        props.setShowDaysOff();
    };

    // On show workdays change send dispatch
    const handleShowWorkdaysChange = () => {
        setShowWorkdays(!showWorkdays);
        props.setShowWorkdays();
    };

    // Set up the start date and end date for the date range filter
    useEffect(() => {
        const now = moment();
        const monthDateMoment = moment(monthDate);
        const endDate = monthDateMoment.isSame(now, 'month')
            ? now
            : moment(monthDate).endOf('month');
        // Set the start and end filters
        const dates = {
            startDate: moment(monthDate),
            endDate
        };

        props.setStartEndDate(dates);
        // }
    }, [monthDate]);

    return (
        <>
            <Grid
                container
                className="workday-filters"
                justify="space-evenly"
                alignItems="flex-end"
            >
                <Grid item>
                    <Select
                        className="workday-filters__input"
                        labelId="sort-by-select-label"
                        id="sort-by-select"
                        value={props.filters.sortBy}
                        onChange={handleSortChange}
                        label="Sort by"
                    >
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="hours">Hours</MenuItem>
                    </Select>
                </Grid>
                <Grid item>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            className="workday-filters__input"
                            label="From"
                            disableFuture
                            minDate={monthDate}
                            value={props.filters.startDate}
                            onChange={handleFromDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            className="workday-filters__input"
                            label="To"
                            disableFuture
                            minDate={monthDate}
                            value={props.filters.endDate}
                            onChange={handleToDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <FormControlLabel
                                className="workday-filters__input"
                                control={
                                    <Switch
                                        size="small"
                                        checked={showDaysOff}
                                        onChange={handleShowDaysOffChange}
                                        name="dayoff-switch"
                                    />
                                }
                                label="Days off"
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                className="workday-filters__input"
                                control={
                                    <Switch
                                        size="small"
                                        checked={showWorkdays}
                                        onChange={handleShowWorkdaysChange}
                                        name="workdays-switch"
                                        color="secondary"
                                    />
                                }
                                label="Workdays"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

WorkdayListFilters.protoTypes = {
    monthDate: PropTypes.string,
    filters: PropTypes.object.isRequired,
    sortByDate: PropTypes.func.isRequired,
    sortByHours: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setStartEndDate: PropTypes.func.isRequired,
    showDaysOff: PropTypes.bool,
    showWorkdays: PropTypes.bool
};

const mapStateToProps = state => ({
    // activeMonth: selectVisibleMonth(state),
    filters: selectAllFilters(state),
    showDaysOff: selectShowDaysOff(state),
    showWorkdays: selectShowWorkdays(state)
});

const mapDispatchToProps = dispatch => ({
    sortByDate: () => dispatch(sortByDate()),
    sortByHours: () => dispatch(sortByHours()),
    setEndDate: endDate => dispatch(setEndDate(endDate)),
    setShowDaysOff: () => dispatch(setShowDaysOff()),
    setShowWorkdays: () => dispatch(setShowWorkdays()),
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setStartEndDate: dates => dispatch(setStartEndDate(dates))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkdayListFilters);
