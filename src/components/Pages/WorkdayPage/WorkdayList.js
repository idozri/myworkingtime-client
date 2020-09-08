import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import WorkdayListItem from './WorkdayListItem';
import { selectVisibleMonth, selectActiveMonthId } from 'selectors/month';
import { selectVisibleWorkdays } from 'selectors/workday';

export const WorkdayList = props => {
    return (
        <>
            {!props.activeMonthId && <Redirect to="/months" />}

            {!props.workdays || props.workdays.length === 0 ? (
                <Paper className="no-workdays-paper">
                    You don't have any workdays this month
                </Paper>
            ) : (
                <div className="mwt-list">
                    {props.workdays.map(workday => (
                        <WorkdayListItem
                            key={workday._id}
                            workday={workday}
                            openUpdateDayForm={props.openUpdateDayForm}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

WorkdayList.propTypes = {
    activeMonthId: PropTypes.string,
    month: PropTypes.object,
    workdays: PropTypes.array,
    openUpdateDayForm: PropTypes.func
};

const mapStateToProps = state => ({
    activeMonthId: selectActiveMonthId(state),
    month: selectVisibleMonth(state),
    workdays: selectVisibleWorkdays(state)
});

export default connect(mapStateToProps)(WorkdayList);
