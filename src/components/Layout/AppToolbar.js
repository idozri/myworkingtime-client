import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Hidden
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
const AppToolbar = ({ onClick }) => (
    <AppBar>
        <Toolbar>
            <Hidden smUp implementation="css">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onClick}
                >
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Hidden smUp implementation="css">
                <Typography className="app-toolbar__logo" noWrap>
                    MyWorkingTime
                </Typography>
            </Hidden>
        </Toolbar>
    </AppBar>
);

AppToolbar.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default AppToolbar;
