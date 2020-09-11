import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, register } from 'actions/auth';
import { selectErrorMsg } from 'selectors/error';
import AuthForm from './AuthForm';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ authLayout, infoSpan }) => ({
    authLayout,
    infoSpan
}));

export const AuthPage = props => {
    const classes = useStyles();

    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('123123123');

    const credentials = { email, password };

    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const onSubmit = ({ isLogin }) => {
        if (isLogin) {
            return props.login(credentials);
        } else {
            return props.register(credentials);
        }
    };

    return (
        <div className={classes.authLayout}>
            <div className="auth-layout__box">
                <h1 className="auth-layout__title">My Working Time</h1>
                <p className={classes.infoSpan}>
                    It's time for you to keep your hours organised
                </p>
                <div className="auth-layout__form">
                    <AuthForm
                        email={email}
                        password={password}
                        error={props.errorMsg}
                        onSubmit={onSubmit}
                        setEmail={handleEmailChange}
                        setPassword={handlePasswordChange}
                    />
                </div>
            </div>
        </div>
    );
};

AuthPage.propTypes = {
    errorMsg: PropTypes.object,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorMsg: selectErrorMsg(state)
});

const mapDispathToProps = dispatch => ({
    login: user => dispatch(login(user)),
    register: user => dispatch(register(user))
});

export default connect(mapStateToProps, mapDispathToProps)(AuthPage);
