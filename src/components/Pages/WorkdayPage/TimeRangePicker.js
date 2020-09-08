import React, { useState } from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';

const TimeRangePicker = props => {
    const now = moment().startOf('day');
    const [timeIn, handleTimeInChange] = useState(
        props.time ? props.time[0] : now
    );
    const [timeOut, handleTimeOutChange] = useState(
        props.time ? props.time[1] : now
    );

    const disabled = props.disabled || false;
    return (
        <>
            <Grid item xs="12">
                <TimePicker
                    className="workday-form__input"
                    ampm={false}
                    label="Time in"
                    value={timeIn}
                    disabled={disabled}
                    onChange={handleTimeInChange}
                />
            </Grid>
            <Grid item xs="12">
                <TimePicker
                    className="workday-form__input"
                    ampm={false}
                    label="Time out"
                    value={timeOut}
                    disabled={disabled}
                    onChange={handleTimeOutChange}
                />
            </Grid>
        </>
    );
};

export default TimeRangePicker;
