import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ infoSpan }) => ({ infoSpan }));

export const AuthForm = props => {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleOnClick = e => {
        setIsLogin(!isLogin);
    };

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);
        props.onSubmit({ isLogin }).then(() => {
            setLoading(false);
        });
    };

    return (
        <form onSubmit={onSubmit} className="auth-form" id="auth-form">
            <Grid container justifyContent="center">
                <Grid item>
                    <TextField
                        type="email"
                        value={props.email}
                        onChange={props.setEmail}
                        autoComplete="username"
                        label="Email"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        type="password"
                        value={props.password}
                        onChange={props.setPassword}
                        autoComplete="password"
                        label="Password"
                    />
                </Grid>

                <Grid item className="auth-form__footer">
                    <Button
                        size="small"
                        onClick={handleOnClick}
                        color="secondary"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </Button>
                    <Button
                        className="mwt-btn"
                        type="submit"
                        form="auth-form"
                        disabled={loading}
                    >
                        {isLogin ? 'Login' : 'Register'}
                        {loading && (
                            <CircularProgress
                                className="mwt-btn__spinner"
                                size={24}
                            />
                        )}
                    </Button>
                </Grid>
                <Grid item>
                    <Typography className={classes.infoSpan}>
                        {props.error.msg}
                    </Typography>
                </Grid>
            </Grid>
        </form>
    );
};

AuthForm.protoType = {
    email: PropTypes.string,
    error: PropTypes.string,
    password: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
};

export { AuthForm as default };
