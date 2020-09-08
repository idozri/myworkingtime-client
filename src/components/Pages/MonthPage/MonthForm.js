import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers/';
import { addMonth, updateMonth } from 'actions/month';

const useStyles = makeStyles(({ infoSpan, monthForm }) => ({
    infoSpan,
    monthForm
}));

export const MonthForm = props => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const [potentialMonthHours, setPotentialMonthHours] = useState(
        props.potentialMonthHours ? props.potentialMonthHours : '160'
    );

    // Set the default value from the month picker
    const date = moment(props.monthDate);
    const [monthValue, setMonthValue] = useState(date);

    const onSubmit = e => {
        setLoading(true);

        // Set the month date
        const monthDate = monthValue.format('MMMM, yyyy');
        // Set the request body object
        const body = {
            monthDate,
            potentialMonthHours
        };

        // If the text od the button is add send add dispatch action creator
        if (props.btnText === 'Add') {
            props.addMonth(body).then(() => setLoading(false));
        } else {
            props.updateMonth({ _id: props.monthId, body }).then(() => {
                if (!loading) {
                    setLoading(false);
                }
            });
        }
    };

    return (
        <>
            <form className={classes.monthForm}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        className="month-form__date-picker"
                        views={['year', 'month']}
                        label="Year and Month"
                        minDate={moment().subtract(5, 'years')}
                        maxDate={moment()}
                        value={monthValue}
                        onChange={setMonthValue}
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    className="month-form__potential_hours"
                    type="number"
                    label="Potential Hours"
                    value={potentialMonthHours}
                    onChange={e => setPotentialMonthHours(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className="mwt-btn"
                    disabled={loading}
                    onClick={() => onSubmit()}
                >
                    {props.btnText}
                    {loading && (
                        <CircularProgress
                            className="mwt-btn__spinner"
                            size={24}
                        />
                    )}
                </Button>
            </form>
        </>
    );
};

MonthForm.propTypes = {
    btnText: PropTypes.string,
    monthDate: PropTypes.string,
    monthId: PropTypes.string,
    potentialMonthHours: PropTypes.number,
    isOpen: PropTypes.bool,
    addMonth: PropTypes.func,
    updateMonth: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
    addMonth: month => dispatch(addMonth(month)),
    updateMonth: month => dispatch(updateMonth(month))
});

export default connect(undefined, mapDispatchToProps)(MonthForm);
