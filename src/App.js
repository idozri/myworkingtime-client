import React from 'react';
import AppRouter from './routers/AppRouter';
import { JssProvider } from 'react-jss';
import { CssBaseline } from '@material-ui/core';
import {
    MuiThemeProvider,
    createGenerateClassName
} from '@material-ui/core/styles';
import theme from './theme';

const App = () => {
    const generateClassName = createGenerateClassName();

    return (
        <>
            <JssProvider generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppRouter />
                </MuiThemeProvider>
            </JssProvider>
        </>
    );
};

export default App;
