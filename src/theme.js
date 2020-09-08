import { createMuiTheme } from '@material-ui/core/styles';
//Font Size
const fontSizeS = '1.4rem';
const fontSizeXS = '0.6rem';
const fontSizeL = '1.8rem';
const fontSizeXL = '3rem';

const muiBaseTheme = createMuiTheme();
const drawerWidth = 240;
const defaultSpacing = muiBaseTheme.spacing(2);
const defaultBreakpoint = muiBaseTheme.breakpoints.up('sm');
const desktopContetnWidth = `calc(100% - ${drawerWidth}px)`;
const maxContainerWidth = '600px';

const drawerBoxShadows = {
    WebkitBoxShadow: 'inset -7px 0px 10px -7px rgba(0,0,0,0.75)',
    MozBoxShadow: 'inset -7px 0px 10px -7px rgba(0, 0, 0, 0.75)',
    boxShadow: 'inset -7px 0px 10px -7px rgba(0, 0, 0, 0.75)'
};

const myColors = {
    primary: {
        light: '#A0C3DE',
        main: '#216FB0',
        dark: '#175274'
    },

    secondary: {
        main: '#BC4f6C'
    },
    text: {
        primary: '#175274',
        secondary: '#757575',
        offWhite: '#D7D4D5'
    },
    divider: '#BDBDBD',
    grey: {
        light: '#EFEFEF',
        main: '#ECECEC',
        dark: '#332F30'
    }
};

const desktopMainContantFix = {
    [muiBaseTheme.breakpoints.up('sm')]: {
        flexShrink: 0,
        left: drawerWidth,
        margin: '0 auto',
        width: desktopContetnWidth,
        maxWidth: desktopContetnWidth
    }
};

export default createMuiTheme({
    palette: {
        primary: {
            main: myColors.primary.main
        },
        divider: myColors.divider,
        secondary: {
            main: myColors.secondary.main
        },
        text: myColors.text
    },
    authLayout: {
        alignItems: 'center',
        background: 'url("/images/bg.jpg")',
        backgroundSize: 'cover',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100vw',
        '& .auth-layout__box': {
            background: '#D5DCE5',
            borderRadius: '100px 300px',
            height: 500,
            textAlign: 'center',
            width: 250,

            WebkitBoxShadow: '-4px 3px 11px 1px rgba(35, 31, 32, 0.75)',
            MozBoxShadow: '-4px 3px 11px 1px rgba(35, 31, 32, 0.75)',
            boxShadow: '-4px 3px 11px 1px rgba(35, 31, 32, 0.75)',
            [defaultBreakpoint]: {
                height: 600,
                width: 300,
                marginBottom: '3.2rem'
            }
        },
        '& .auth-layout__title': {
            alignItems: 'center',
            color: myColors.primary.main,
            display: 'flex',
            fontSize: fontSizeS,
            justifyContent: 'center',
            lineHeight: 1,
            marginTop: '4.8rem',
            paddingTop: '4.8rem',
            [defaultBreakpoint]: {
                fontSize: fontSizeL,
                marginTop: 100
            }
        },
        '& .auth-form': {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 3.2rem 0.8rem 3.2rem',
            alignItems: 'center',
            '& .auth-form__footer': {
                width: 'inherit',
                justifyContent: 'space-around',
                display: 'flex'
            },
            '& .auth-form__error-span': {
                color: myColors.secondary.main
            }
        },
        '& .auth-layout__form__group': {
            marginTop: '0.8rem'
        }
    },
    appContent: {
        flexGrow: 1,
        height: '100%',
        padding: defaultSpacing
    },
    infoSpan: {
        color: myColors.secondary.main,
        fontSize: `${fontSizeXS} !important`,
        margin: '0.8rem 1.2rem 2rem 1.2rem !important'
    },
    pageHeader: {
        background: myColors.primary.main,
        minHeight: '200px',
        minWidth: '100%',
        position: 'fixed',
        top: '50px',
        left: 0,
        zIndex: 200,

        [muiBaseTheme.breakpoints.up('sm')]: {
            width: `calc((100% - ${drawerWidth}px))`,
            left: drawerWidth
        },
        '& .page-header__title-box': {
            display: 'box',
            [muiBaseTheme.breakpoints.up('md')]: {
                width: 'calc(100% - 240px)',
                '& .page-header__title': {
                    margin: '16px auto 0 auto'
                }
            }
        },
        '& .page-header__title': {
            color: muiBaseTheme.palette.common.white,
            fontWeight: muiBaseTheme.typography.fontWeightBold,
            margin: `${defaultSpacing}px 0 0 ${defaultSpacing * 1.5}px`,
            maxWidth: maxContainerWidth,
            width: desktopContetnWidth
        },
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            backgroundColor: 'transparent',
            bottom: '-50px',
            height: '50px',
            width: '25px',
            borderTopLeftRadius: '10px',
            boxShadow: `0 -25px 0 0 ${myColors.primary.main}`
        },
        '&::after': {
            content: '""',
            borderTopRightRadius: '10px',
            width: '100%',
            [muiBaseTheme.breakpoints.up('sm')]: {
                width: `calc((100% - ${drawerWidth}px))`
            }
        }
    },
    mainContainer: {
        ...desktopMainContantFix,
        height: '100%',
        position: 'absolute',
        margin: '0  auto',
        padding: 0,
        '& .main-container__content-container': {
            padding: 0,
            position: 'relative',
            top: '300px',
            zIndex: 100
        },
        '& .content-container__page-top': {
            ...desktopMainContantFix,

            minHeight: 100,
            position: 'fixed',
            top: '150px',
            left: 0,
            zIndex: 300
        },
        '& .page-top__paper': {
            alignItems: 'center',
            borderRadius: '3px 3px 0 0',
            display: 'flex',
            justifyContent: 'space-evenly',
            left: 0,
            margin: '0  auto',
            maxWidth: 600,
            minHeight: '100px',
            padding: `0px ${defaultSpacing}px`,
            '& .paper__sort-label': {
                color: muiBaseTheme.palette.grey[600],
                fontSize: muiBaseTheme.typography.fontSize,
                marginTop: defaultSpacing
            }
        },
        '& .page-top__workdays': {
            flexDirection: 'column',
            minHeight: '200px',
            '& .page-top__month-label': {
                fontFamily: '"Courgette", cursive',
                [muiBaseTheme.breakpoints.down('sm')]: {
                    fontSize: '2rem'
                }
            },
            '& .page-top__workdays__add-day-btn': {
                width: '80%',
                backgroundColor: myColors.primary.dark,
                '& span': {
                    color: muiBaseTheme.palette.common.white,
                    fontWeight: muiBaseTheme.typography.fontWeightBold,
                    textDecoration: 'none'
                }
            },
            '& .page-top__workdays-total-hours-text': {
                fontSize: muiBaseTheme.typography.fontSize,
                [muiBaseTheme.breakpoints.up('md')]: {
                    fontSize: '1rem'
                },
                '& .page-top__workdays-total-hours-span': {
                    color: myColors.secondary.main,
                    fontWeight: muiBaseTheme.typography.fontWeightBold
                }
            },
            '& .page-top__workdays__dialog_wrap': {
                maxWidth: '400px !important',
                width: desktopContetnWidth,
                '& .workday-form': {
                    backgroundColor: '#000',
                    '&.workday-form__input': {
                        width: '100%'
                    }
                }
            }
        },

        '& .content-container__workdays-wrap': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '0 auto',
            padding: `0 ${defaultSpacing}px`,
            marginBottom: defaultSpacing,
            maxWidth: 600,
            marginTop: 50,
            '& .workday-filters': {
                marginBottom: defaultSpacing * 2,
                justifyContent: 'space-evenly',
                '& .workday-filters__input': {
                    width: 100,
                    marginBottom: defaultSpacing
                }
            }
        }
    },
    monthForm: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-evenly',
        width: '100%',

        '& .month-form__date-picker': {},
        '& .month-form__potential_hours': {
            margin: `0 ${defaultSpacing}px`
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    height: '100%'
                },
                body: {
                    height: '100%',
                    lineHeight: 1.6
                },
                '& #root': {
                    height: '100%'
                }
            }
        },
        MuiAccordion: {
            root: {
                '&.month-accordion': {
                    maxWidth: maxContainerWidth,
                    margin: '0 auto',
                    '& .month-accordion__label': {
                        color: myColors.secondary.main,
                        fontSize: muiBaseTheme.typography.caption.fontSize
                    },
                    '&.month-accordion__add-month': {
                        boxShadow:
                            '0px 7px 5px -1px rgba(0,0,0,0.2), 0px 1px 3px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                        marginTop: 0
                    }
                },
                '&.workday-accordion': {
                    '& .workday-accordion__title': {
                        fontSize: muiBaseTheme.typography.h5.fontSize,
                        fontWeight: muiBaseTheme.typography.fontWeightBold
                    },
                    '& .workday-accordion__subtitle': {
                        fontWeight: muiBaseTheme.typography.fontWeightBold
                        // marginRight: defaultSpacing * 2
                    },
                    '& .workday-accordion__time-label, & .workday-accordion__note-label': {
                        color: myColors.primary.dark,
                        fontSize: muiBaseTheme.typography.h6.fontSize,
                        fontWeight: muiBaseTheme.typography.fontWeightBold
                    },
                    '& .workday-accordion__time-value, & .workday-accordion__dayoff-label': {
                        fontSize: muiBaseTheme.typography.h4.fontSize,
                        fontWeight: muiBaseTheme.typography.fontWeightBold
                    },
                    '& .workday-accordion__note-label': {
                        marginLeft: defaultSpacing * 2
                    },
                    '& .workday-accordion__note-value': {
                        overflowWrap: 'break-word',
                        fontSize: muiBaseTheme.typography.body2.fontSize,
                        marginLeft: defaultSpacing * 2
                    }
                }
            }
        },
        MuiAppBar: {
            root: {
                boxShadow: 'none',
                position: 'fixed',
                [muiBaseTheme.breakpoints.up('sm')]: {
                    width: desktopContetnWidth,
                    marginLeft: drawerWidth
                },
                '& .app-toolbar__logo': {
                    fontSize: muiBaseTheme.typography.fontSize * 1.5,
                    fontFamily: '"Courgette", cursive'
                }
            },
            colorPrimary: {
                color: myColors.primary.light
            }
        },
        MuiMenuItem: {
            root: {
                paddingBottom: 16,
                paddingTop: 16
            }
        },
        MuiListItem: {
            root: {
                '&.Mui-selected': {
                    color: myColors.primary.dark,
                    background: myColors.primary.light,
                    ...drawerBoxShadows
                },

                '&.MuiListItem-button': {
                    '&:hover': {
                        color: muiBaseTheme.palette.common.white,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        ...drawerBoxShadows
                    }
                }
            }
        },
        MuiButton: {
            root: {
                '&.mwt-btn': {
                    color: muiBaseTheme.palette.common.white,
                    backgroundColor: myColors.primary.main,
                    borderRadius: '10px 30px',
                    padding: `${defaultSpacing / 2}px ${defaultSpacing}px`,
                    marginLeft: '8px',
                    transition: 'all 500ms ease',
                    '& .mwt-btn__spinner': {
                        color: myColors.grey.light,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: -12,
                        marginLeft: -12
                    },
                    '&:active, &:hover': {
                        backgroundColor: myColors.secondary.main,
                        borderRadius: 5
                    },
                    '&:active, &:hover, &:focus': {
                        outline: 'none'
                    }
                },
                '& a': {
                    textDecoration: 'none',
                    color: myColors.primary.dark
                }
            },
            label: {
                fontSize: '12px'
            }
        },
        MuiCard: {
            root: {
                '&.month-card': {
                    marginBottom: defaultSpacing,
                    maxWidth: maxContainerWidth,
                    margin: '0 16px 16px 16px',
                    [muiBaseTheme.breakpoints.up('sm')]: {
                        margin: '0 auto 16px auto'
                    },
                    '& .month-card__row': {
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        margin: 0,
                        width: '100%',
                        minHeight: 120
                    },
                    '& .month-card__column': {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'baseline',
                        textAlign: 'right',

                        '& .column__1': {
                            flexDirection: 'row',
                            textAlign: 'right',
                            widht: '60%'
                        },
                        '& .column__2': {
                            flexDirection: 'column',
                            widht: '30%'
                        },
                        '& .column__3': {
                            color: '#fff',
                            flexDirection: 'column',
                            widht: '10%'
                        },
                        '& .month-card__details-label': {
                            fontSize: muiBaseTheme.typography.pxToRem(10),
                            marginRight: muiBaseTheme.spacing(0.5),
                            '&.total-details-label': {
                                color: myColors.secondary.main,
                                fontWeight:
                                    muiBaseTheme.typography.fontWeightBold,
                                textAlign: 'center',
                                width: '100%'
                            }
                        },
                        '& .month-card__icon': {
                            color: myColors.primary.main,
                            height: '10px',
                            marginRight: muiBaseTheme.spacing(0.5),
                            width: '10px'
                        },
                        '& .month-card__name-label, & .month-card__year-label': {
                            fontWeight: muiBaseTheme.typography.fontWeightBold,
                            fontSize: muiBaseTheme.typography.h5.fontSize
                        },
                        '& .month-card__year-label': {
                            color: myColors.primary.main,
                            fontSize: muiBaseTheme.typography.caption.fontSize
                        }
                    }
                }
            }
        },
        MuiContainer: {
            root: {
                '&.mui-main-app-container': {
                    display: 'flex',
                    height: '100%',
                    padding: 0
                }
            }
        },
        MuiDialog: {
            root: {
                [defaultBreakpoint]: {
                    width: desktopContetnWidth,
                    left: `${drawerWidth}px !important`
                }
            }
        },
        MuiDialogContent: {
            root: {
                '& .workday-form__input': {
                    margin: `${defaultSpacing / 2}px auto`,
                    width: '100%'
                }
            }
        },
        MuiDivider: {
            root: {
                borderColor: myColors.primary.light,
                borderBottomWidth: '0.01rem',
                marginBottom: '2rem'
            }
        },
        MuiDrawer: {
            root: {
                '& .app-drawer__logo-wrap': {
                    alignItems: 'center',
                    display: 'flex',
                    marginLeft: defaultSpacing,
                    minHeight: '50px',
                    '& .app-drawer__logo': {
                        fontFamily: '"Courgette", cursive',
                        fontSize: muiBaseTheme.typography.fontSize * 1.5
                    }
                }
            },
            paper: {
                background: myColors.primary.dark,
                backgroundPosition: 'bottom',

                // backgroundImage: `linear-gradient(112.1deg, ${myColors.grey.dark} 20.4%, ${myColors.primary.dark} 140.2%);`,
                color: muiBaseTheme.palette.common.white,
                width: drawerWidth
            },
            paperAnchorDockedLeft: {
                borderRight: 'none',
                ...drawerBoxShadows
            }
        },
        MuiExpansionPanel: {
            root: {
                '&.month-accordion month-accordion__add-month': {}
            }
        },
        MuiFormLabel: {
            root: {
                fontSize: muiBaseTheme.typography.caption.fontSize
            }
        },
        MuiGrid: {
            container: {
                justifyContent: 'space-evenly'
            }
        },
        MuiInputBase: {
            root: {
                fontSize: muiBaseTheme.typography.body2.fontSize
            }
        },

        MuiPaper: {
            root: {
                '&.no-workdays-paper': {
                    alignItems: 'center',
                    color: myColors.primary.light,
                    display: 'flex',
                    fontSize: muiBaseTheme.typography.h5.fontSize,
                    minHeight: '150px',
                    textAlign: 'center',
                    [defaultBreakpoint]: {
                        fontSize: muiBaseTheme.typography.h3.fontSize,
                        minHeight: '300px'
                    }
                }
            }
        },
        MuiTableSortLabel: {
            root: {
                '&.page-top__month-sort-label span': {
                    fontSize: '0.5rem'
                }
            }
        },
        MuiTextField: {
            root: {
                marginBottom: defaultSpacing
            }
        },
        MuiToolbar: {
            root: {}
        }
    },
    mixins: {
        toolbar: {
            [muiBaseTheme.breakpoints.up('xs')]: {
                minHeight: 50
            },
            minHeight: 50
        }
    }
});
