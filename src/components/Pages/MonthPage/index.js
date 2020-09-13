import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
    Paper,
    TableSortLabel,
    TextField,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import { deleteMonth, setActiveMonth } from 'actions/month';
import { setSearchMonthDate, sortByDate } from 'actions/monthFilters';
import { selectVisibleMonths, selectMonthSortAscFilter } from 'selectors/month';
import { selectErrorMsg } from 'selectors/error';

import MonthCard from './MonthCard';
import MonthForm from './MonthForm';

const useStyles = makeStyles(({ infoSpan }) => ({
    infoSpan,
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    }
}));

export const MonthPage = props => {
    const classes = useStyles();

    // Delete the month
    const handleRemoveMonth = id => {
        props.deleteMonth(id);
    };

    // Set the month as the active month
    const handleOnClick = monthId => {
        props.setActiveMonth(monthId);
        props.history.push('/');
    };

    const handleSearchOnChange = text => {
        props.setSearchMonthDate(text);
    };

    const handleSortByChange = () => props.sortByDate();

    return (
        <>
            <Container className="content-container__page-top">
                <Paper className="page-top__paper" elevation={12}>
                    <TextField
                        label="SEARCH MONTH"
                        onChange={e => handleSearchOnChange(e.target.value)}
                    />
                    <TableSortLabel
                        active
                        direction={props.sortAsc ? 'asc' : 'desc'}
                        className="paper__sort-label"
                        onClick={() => handleSortByChange()}
                    >
                        SORT DATE
                        <span className={classes.visuallyHidden}>
                            {props.sortBy
                                ? 'sorted ascending'
                                : 'sorted descending'}
                        </span>
                    </TableSortLabel>
                </Paper>
                <Accordion className="month-accordion month-accordion__add-month">
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="add-month"
                        id="add-month-header"
                    >
                        <Typography className="month-accordion__label">
                            CREATE MONTH
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MonthForm btnText={'Add'} />
                    </AccordionDetails>
                    <Typography className={classes.infoSpan}>
                        {props.errorMsg.msg}
                    </Typography>
                </Accordion>
            </Container>
            <Container className="main-container__content-container">
                {props.months.map(month => (
                    <MonthCard
                        month={month}
                        key={month._id}
                        handleRemoveMonth={handleRemoveMonth}
                        handleOnClick={handleOnClick}
                    />
                ))}
            </Container>
        </>
    );
};

errorMsg: PropTypes.object,
    (MonthPage.propTypes = {
        errorMsg: PropTypes.object,
        months: PropTypes.array,
        history: PropTypes.object,
        deleteMonth: PropTypes.func
    });

const mapStateToProps = state => ({
    errorMsg: selectErrorMsg(state),
    months: selectVisibleMonths(state),
    sortAsc: selectMonthSortAscFilter(state)
});

const mapDispatchToProps = dispatch => ({
    deleteMonth: id => dispatch(deleteMonth(id)),
    setSearchMonthDate: text => dispatch(setSearchMonthDate(text)),
    setActiveMonth: id => dispatch(setActiveMonth(id)),
    sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthPage);
