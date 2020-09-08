import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import WorkdayList from './WorkdayList';
import WorkdatListFilters from './WorkdayListFilters';
import { Button, Container, Paper, Typography } from '@material-ui/core';
import WorkdayFormDialog from './WorkdayFormDialog';
import { selectVisibleMonthDate } from 'selectors/month';
import { selectVisibaleWorkdaysTotalHours } from 'selectors/workday';
import { Redirect } from 'react-router-dom';

export const WorkdayPage = props => {
    const [workday, setWorkday] = useState(undefined);

    //Open dialog
    const [open, setOpen] = useState(false);
    const [formBtnText, setFormBtnText] = useState('');

    // Open dialog
    const openAddDayForm = e => {
        setFormBtnText('Add');
        setOpen(true);
    };
    const openUpdateDayForm = workdayToUpdate => {
        setWorkday(workdayToUpdate);
        setFormBtnText('Update');
        setOpen(true);
    };
    return (
        <>
            {!props.monthDate && <Redirect to="/months" />}
            <Container className="content-container__page-top">
                <Paper
                    className="page-top__paper page-top__workdays"
                    elevation={12}
                >
                    <Typography className="page-top__month-label" variant="h2">
                        {props.monthDate}
                    </Typography>
                    <Typography
                        className="page-top__workdays-total-hours-text"
                        variant="body2"
                    >
                        You've worked{' '}
                        <span className="page-top__workdays-total-hours-span">
                            {props.workdaysTotalHours}
                        </span>{' '}
                        hours this month
                    </Typography>
                    <Button
                        className="page-top__workdays__add-day-btn"
                        onClick={openAddDayForm}
                    >
                        <Typography variant="button">Add Day</Typography>
                    </Button>
                </Paper>
            </Container>

            <Container className="main-container__content-container">
                <div className="content-container__workdays-wrap">
                    <WorkdatListFilters monthDate={props.monthDate} />
                    <WorkdayList openUpdateDayForm={openUpdateDayForm} />
                </div>
            </Container>
            <WorkdayFormDialog
                open={open}
                setOpen={setOpen}
                formBtnText={formBtnText}
                workday={workday}
            />
        </>
    );
};

WorkdayPage.propTypes = {
    monthDate: PropTypes.string,
    workdaysTotalHours: PropTypes.number
};

const mapStateToProps = state => ({
    monthDate: moment(selectVisibleMonthDate(state)).format('MMMM YYYY'),
    workdaysTotalHours: selectVisibaleWorkdaysTotalHours(state)
});

export default connect(mapStateToProps)(WorkdayPage);
