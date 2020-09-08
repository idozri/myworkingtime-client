import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import history from 'src/helpers/history';
// import AuthPage from 'components/AuthPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoadingPage from '../components/LoadingPage';
// import MonthPage from 'components/Pages/MonthPage';
// import WorkdayPage from 'components/Pages/WorkdayPage/';
import NotFoundPage from 'components/NotFoundPage';
import store from '../store';
import { Provider } from 'react-redux';

export const AppRouter = () => {
    // const WorkdayPage = loadable(() => import('components/Pages/WorkdayPage/'));

    // const MonthPage = loadable(() => import('components/Pages/MonthPage/'));

    const AuthPage = loadable(() => import('components/AuthPage'));

    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <PrivateRoute path="/" page="WorkdayPage" exact />
                    <PrivateRoute path="/months" page="MonthPage" />
                    <PublicRoute path="/login" component={AuthPage} />

                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </Provider>
    );
};
export default AppRouter;
