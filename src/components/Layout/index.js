import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppNav from './AppNav';
import AppToolbar from './AppToolbar';

const useStyles = makeStyles(
    ({ appContent, mainContainer, pageHeader, mixins: { toolbar } }) => ({
        // // necessary for content to be below app bar
        toolbar,
        appContent,
        mainContainer,
        pageHeader
    })
);

const Layout = props => {
    const AsyncPage = loadable(() => import(`components/Pages/${props.page}/`));
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppToolbar onClick={handleDrawerToggle} />
            <AppNav
                open={mobileOpen}
                onClick={mobileOpen}
                onClose={handleDrawerToggle}
                classes={classes}
            />
            <div className={classes.toolbar} />
            <div className={classes.pageHeader}>
                <div className="page-header__title-box">
                    <Typography variant="h4" className="page-header__title">
                        {props.location.pathname === '/'
                            ? 'Workdays'
                            : 'Months'}
                    </Typography>
                </div>
            </div>
            <main className={classes.mainContainer}>
                {<AsyncPage {...props} />}
            </main>
        </>
    );
};

Layout.propTypes = {
    location: PropTypes.object.isRequired
};

const LayoutWithRouter = withRouter(Layout);

export default LayoutWithRouter;
