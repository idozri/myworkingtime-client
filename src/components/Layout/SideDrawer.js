import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Drawer,
    Divider,
    MenuItem,
    MenuList,
    Typography
} from '@material-ui/core';
import { logout } from 'actions/auth';

const SideDrawer = props => {
    const {
        onClick,
        location: { pathname }
    } = props;

    const handleLogoutClick = () => {
        props.logout();
    };

    return (
        <Drawer
            variant={props.variant}
            anchor="left"
            open={props.open}
            onClose={props.onClose}
        >
            <div>
                <div className="app-drawer__logo-wrap">
                    <Typography className="app-drawer__logo">
                        MyWorkingTime
                    </Typography>
                </div>
                <Divider />
                <MenuList>
                    <MenuItem
                        key="workdays"
                        onClick={onClick}
                        component={Link}
                        to="/"
                        selected={'/' === pathname}
                    >
                        Workdays
                    </MenuItem>
                    <MenuItem
                        key="months"
                        onClick={onClick}
                        component={Link}
                        to="/months"
                        selected={'/months' === pathname}
                    >
                        Months
                    </MenuItem>

                    <MenuItem key="logout" onClick={handleLogoutClick}>
                        Logout
                    </MenuItem>
                </MenuList>
            </div>
        </Drawer>
    );
};

SideDrawer.propTypes = {
    variant: PropTypes.string,
    toolbarClasses: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    logout: PropTypes.func.isRequired
};

const SideDrawerWithRouter = withRouter(SideDrawer);

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(undefined, mapDispatchToProps)(SideDrawerWithRouter);
