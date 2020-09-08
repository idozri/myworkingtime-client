import React from 'react';
import PropTypes from 'prop-types';
import { Hidden } from '@material-ui/core';
import SideDrawer from './SideDrawer';

const AppNav = props => (
    <nav className={props.classes.drawer} aria-label="navigation links">
        <Hidden smUp implementation="css">
            <SideDrawer
                variant="temporary"
                anchor="left"
                open={props.open}
                onClose={props.onClose}
                ModalProps={true}
                toolbarClasses={props.classes.toolbar}
            />
        </Hidden>
        <Hidden xsDown implementation="css">
            <SideDrawer
                variant="permanent"
                toolbarClasses={props.classes.toolbar}
                open
            />
        </Hidden>
    </nav>
);

AppNav.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default AppNav;
