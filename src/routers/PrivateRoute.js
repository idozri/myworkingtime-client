import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import LoadingPage from 'components/LoadingPage';
import Layout from 'components/Layout/';

const PrivateRoute = ({ isAuthenticated, page, ...rest }) => {
    const Layout = loadable(() => import('components/Layout'), {
        fallback: <LoadingPage />
    });

    return (
        <Route
            {...rest}
            component={props =>
                isAuthenticated ? (
                    <Layout page={page} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    page: PropTypes.string.isRequired,
    // component: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    //     .isRequired,
    rest: PropTypes.object
};

const mapStateTopProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateTopProps)(PrivateRoute);
