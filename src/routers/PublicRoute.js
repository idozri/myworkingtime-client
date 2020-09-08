import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={props =>
            isAuthenticated ? (
                <Redirect to="/" />
            ) : (
                <div>
                    <Component {...props} />
                </div>
            )
        }
    />
);

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateTopProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateTopProps)(PublicRoute);
