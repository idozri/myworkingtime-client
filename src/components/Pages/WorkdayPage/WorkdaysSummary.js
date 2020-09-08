import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Typography } from '@material-ui/core';
import { selectVisibaleWorkdaysTotalHours } from 'selectors/workday';
import { selectVisibleMonthDate } from 'selectors/month';

export const WorkdaysSummary = ({ monthDate, workdaysTotalHours }) => (
    <>
        <Typography variant="h3">{monthDate}</Typography>
        <Typography variant="h6">
            You've worked {workdaysTotalHours} hours in this month
        </Typography>
        <Button className="mwt-btn">
            <Link to="/create">Add Day</Link>
        </Button>
    </>
);

const mapStateToProps = state => ({
    monthDate: moment(selectVisibleMonthDate(state)).format('MMMM, YYYY'),
    workdaysTotalHours: selectVisibaleWorkdaysTotalHours(state)
});

export default connect(mapStateToProps)(WorkdaysSummary);
