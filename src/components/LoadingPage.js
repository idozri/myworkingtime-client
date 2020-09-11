import React, { useState } from 'react';
import { css } from '@emotion/core';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { makeStyles, CssBaseline } from '@material-ui/core';
import theme from '../theme';

const useStyles = makeStyles({ loadingWrap: theme.loadingWrap });

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    widht: 100%;
`;

const LoadingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.loadingWrap}>
            <CssBaseline />
            <PropagateLoader
                css={override}
                size={15}
                color={'#fafafa'}
                loading={true}
            />
        </div>
    );
};

export default LoadingPage;
