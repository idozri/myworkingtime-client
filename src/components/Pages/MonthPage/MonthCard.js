import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    Typography
} from '@material-ui/core';
import {
    DoneAll,
    EventAvailable,
    ExpandMore,
    HourglassEmpty,
    Weekend
} from '@material-ui/icons';
import MonthForm from './MonthForm';

export const MonthCard = props => {
    const monthDate = moment(props.month.monthDate);

    return (
        <Card className="month-card">
            <div
                className="month-card__row"
                onClick={() => props.handleOnClick(props.month._id)}
            >
                <div className="month-card__column column__1">
                    <Typography className="month-card__year-label">
                        {monthDate.year()}
                    </Typography>
                    <Typography className="month-card__name-label">
                        {monthDate.format('MMMM').toUpperCase()}
                    </Typography>
                </div>
                <div className="month-card__column column__2">
                    <Typography className="month-card__details-label">
                        <EventAvailable
                            className="month-card__icon"
                            viewBox="0 0 30 30"
                        />
                        TOTAL HOURS
                    </Typography>
                    <Typography className="month-card__details-label">
                        <HourglassEmpty
                            className="month-card__icon"
                            viewBox="0 0 30 30"
                        />
                        WORKDAYS
                    </Typography>
                    <Typography className="month-card__details-label">
                        <Weekend
                            className="month-card__icon"
                            viewBox="0 0 24 24"
                        />
                        DAYS OFF
                    </Typography>
                    <Typography className="month-card__details-label">
                        <DoneAll
                            className="month-card__icon"
                            viewBox="0 0 24 24"
                        />
                        POTENTIAL HOURS
                    </Typography>
                </div>
                <div className="month-card__column column__3">
                    <Typography className="month-card__details-label total-details-label">
                        {props.month.totalHours}
                    </Typography>
                    <Typography className="month-card__details-label total-details-label">
                        {props.month.totalWorkdays}
                    </Typography>
                    <Typography className="month-card__details-label total-details-label">
                        {props.month.totalDaysOff}
                    </Typography>
                    <Typography className="month-card__details-label total-details-label">
                        {props.month.potentialMonthHours}
                    </Typography>
                </div>
            </div>
            <div>
                <Accordion className="month-accordion">
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="update-month"
                        id="update-month-header"
                    >
                        <Typography className="month-accordion__label">
                            UPDATE MONTH
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MonthForm
                            monthDate={props.month.monthDate}
                            monthId={props.month._id}
                            potentialMonthHours={
                                props.month.potentialMonthHours
                            }
                            btnText={'Save'}
                        />
                    </AccordionDetails>
                    <AccordionActions>
                        <Button
                            onClick={() =>
                                props.handleRemoveMonth(props.month._id)
                            }
                            color="secondary"
                            size="small"
                            style={{ fontSize: '0.5rem' }}
                        >
                            Remove
                        </Button>
                    </AccordionActions>
                </Accordion>
            </div>
        </Card>
    );
};

MonthCard.propTypes = {
    month: PropTypes.object,
    handleOnClick: PropTypes.func,
    handleRemoveMonth: PropTypes.func
};

export { MonthCard as default };
