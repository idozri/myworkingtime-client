import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Typography
} from '@material-ui/core';
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { addWorkday, updateWorkday } from 'actions/workday';
import { selectErrorMsg } from 'selectors/error';
import { selectVisibleMonthDate, selectActiveMonthId } from 'selectors/month';

const useStyles = makeStyles(({ authLayout, infoSpan }) => ({
    authLayout,
    infoSpan
}));

const WorkdayFormDialog = props => {
    const classes = useStyles();
    const [workday, setWorkday] = useState(props.workday);

    // Loading spinner boolean
    const [loading, setLoading] = React.useState(false);

    // If disabled cannot performed a submit
    const [submitDisabled, setSubmitDisabled] = useState(true);
    // Disable inputs in case of day off
    const [disabled, setDisabled] = useState(false);

    // Workday properties
    const [date, setDate] = useState(moment(props.monthDate));
    const [timeIn, setTimeIn] = useState(date);
    const [timeOut, setTimeOut] = useState(date);
    const [isDayOff, setIsDayOff] = useState(false);
    const [note, setNote] = useState('');

    // Close dialog
    const handleClose = () => {
        props.setOpen(false);
        resetState();
    };

    const handleSwitchOnChange = () => {
        setIsDayOff(!isDayOff);
        // Disable components that are not related to a "day off"
        setDisabled(!disabled);
    };

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);

        const updates = {
            date,
            timeIn: timeIn,
            timeOut: timeOut,
            note,
            isDayOff,
            owner: props.activeMonthId
        };

        executeAction(updates).then(res => {
            setLoading(false);
            !res.err && handleClose();
        });
    };

    const executeAction = async updates => {
        if (props.formBtnText === 'Add') {
            return await props.addWorkday(updates);
        } else {
            return await props.updateWorkday({ id: workday._id, updates });
        }
    };

    // Set the state values of the workday to the form
    const handleSetWorkday = () => {
        setWorkday(props.workday);
        setDate(moment(props.workday.date));
        setTimeIn(moment(props.workday.timeIn));
        setTimeOut(moment(props.workday.timeOut));
        setIsDayOff(props.workday.isDayOff);
        setNote(props.workday.note);
    };

    const resetState = () => {
        //Reset the state values
        setDisabled(false);
        setIsDayOff(false);
        setNote('');
        setTimeIn(date);
        setTimeOut(date);
        setDate(moment(props.monthDate));
        setWorkday(undefined);
    };

    useEffect(() => {
        // If valid form enable the submit button
        if (isDayOff || timeIn._d.toString() !== timeOut._d.toString()) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [date, isDayOff, timeIn, timeOut]);

    useEffect(() => props.workday && handleSetWorkday(), [props.workday]);

    return (
        <>
            <div className="page-top__workdays__dialog_wrap">
                <Dialog
                    maxWidth="xs"
                    open={props.open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Add a new workday
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    Current month
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    {moment(props.monthDate).format('MMM yyyy')}{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button>
                                    <Link to="/months">Change</Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <form
                            id="workday-form"
                            className="workday-form"
                            onSubmit={onSubmit}
                        >
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TimePicker
                                            className="workday-form__input"
                                            ampm={false}
                                            label="Time in"
                                            value={timeIn}
                                            disabled={disabled}
                                            onChange={setTimeIn}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TimePicker
                                            className="workday-form__input"
                                            ampm={false}
                                            label="Time out"
                                            value={timeOut}
                                            disabled={disabled}
                                            onChange={setTimeOut}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DatePicker
                                            className="workday-form__input"
                                            label="Date"
                                            disableFuture
                                            minDate={date}
                                            value={date}
                                            onChange={setDate}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            className="workday-form__input"
                                            label="Add a note"
                                            multiline
                                            rowsMax={4}
                                            defaultValue={note}
                                            onChange={e =>
                                                setNote(e.target.value)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={isDayOff}
                                                    onChange={e =>
                                                        handleSwitchOnChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                    name="dayoff-switch"
                                                    color="secondary"
                                                />
                                            }
                                            label="Day off"
                                        />
                                    </Grid>
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            CANCEL
                        </Button>
                        <Button
                            className="mwt-btn"
                            type="submit"
                            form="workday-form"
                            color="secondary"
                            disabled={submitDisabled}
                        >
                            {props.formBtnText}
                            {loading && (
                                <CircularProgress
                                    className="mwt-btn__spinner"
                                    size={24}
                                />
                            )}
                        </Button>
                    </DialogActions>
                    <Typography className={classes.infoSpan}>
                        {props.errorMsg.msg}
                    </Typography>
                </Dialog>
            </div>
        </>
    );
};

WorkdayFormDialog.propTypes = {
    errorMsg: PropTypes.object,
    activeMonthId: PropTypes.string,
    monthDate: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    workday: PropTypes.object
};

const mapStateToProps = state => ({
    activeMonthId: selectActiveMonthId(state),
    errorMsg: selectErrorMsg(state),
    monthDate: selectVisibleMonthDate(state)
});

const mapDispatchToProps = dispatch => ({
    addWorkday: workday => dispatch(addWorkday(workday)),
    updateWorkday: workday => dispatch(updateWorkday(workday))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkdayFormDialog);
