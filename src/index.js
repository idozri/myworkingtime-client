import React from 'react';
import { hydrate } from 'react-dom';
import store from './store';
import { loadUser } from './actions/auth';
import loadable from '@loadable/component';
import { loadableReady } from '@loadable/component';
import * as serviceWorker from './serviceWorker';
import LoadingPage from 'components/LoadingPage';

const renderApp = async () => {
    const App = loadable(() => import('./App'), {
        fallback: <LoadingPage />
    });

    const token = store.getState().auth.token;
    // // If token load data
    // Load the user. if no token in local storage redirect to login page
    token && (await store.dispatch(loadUser(token)));

    loadableReady(() => {
        const root = document.getElementById('root');
        hydrate(<App />, root);
    });
};

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
