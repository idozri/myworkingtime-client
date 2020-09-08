import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { deleteWorkday } from 'actions/workday';

export const WorkdayListItem = props => {
    const { _id, timeIn, timeOut, totalHours, note, isDayOff } = props.workday;
    const date = moment(props.workday.date).format('DD dddd');

    const handleOnRemoveClick = id => {
        props.deleteWorkday(id);
    };

    return (
        <>
            <Accordion className="workday-accordion">
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={12}>
                            <Typography
                                className={'workday-accordion__title'}
                                align="center"
                            >
                                {date}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                align="center"
                                className={'workday-accordion__subtitle'}
                                color="secondary"
                            >
                                Total Hours {totalHours}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        {isDayOff ? (
                            <Grid item xs={12}>
                                <Typography
                                    align="center"
                                    className="workday-accordion__dayoff-label"
                                >
                                    Day Off
                                </Typography>
                            </Grid>
                        ) : (
                            <>
                                <Grid item xs={12}>
                                    <Grid container justify="space-evenly">
                                        <Grid item>
                                            <Typography className="workday-accordion__time-label">
                                                Time In
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="h6"
                                                className="workday-accordion__time-label"
                                            >
                                                Time Out
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="space-evenly">
                                        <Grid itemScope>
                                            <Typography className="workday-accordion__time-value">
                                                {moment(timeIn).format('HH:mm')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className="workday-accordion__time-value">
                                                {moment(timeOut).format(
                                                    'HH:mm'
                                                )}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                className="workday-accordion__note-label"
                            >
                                Note
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="workday-accordion__note-value">
                                {note}
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
                <AccordionActions>
                    <ConfirmDialog handleOnRemoveClick={handleOnRemoveClick} />
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => props.openUpdateDayForm(props.workday)}
                    >
                        UPDATE
                    </Button>
                </AccordionActions>
            </Accordion>
        </>
    );
};

const ConfirmDialog = props => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button onClick={handleClickOpen} size="small" color="secondary">
                REMOVE
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure you want to remove this item?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are about to delete this item, this can not be
                        undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        CANCEL
                    </Button>
                    <Button
                        onClick={() => props.handleOnRemoveClick()}
                        color="secondary"
                    >
                        REMOVE
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

ConfirmDialog.protoTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    handleOnRemoveClick: PropTypes.func
};

WorkdayListItem.protoTypes = {
    workday: PropTypes.object.isRequired,
    deleteWorkday: PropTypes.func,
    openUpdateDayForm: PropTypes.func
};

const mapDispatchToProps = (dispatch, props) => ({
    deleteWorkday: () => dispatch(deleteWorkday(props.workday._id))
});

export default connect(undefined, mapDispatchToProps)(WorkdayListItem);
