const isBroswer = typeof window !== 'undefined';
// Clear state when authentication error
export const failedAction = draft => {
    // Remove the token from local storage
    if (isBroswer) {
        isBroswer && localStorage.removeItem('activeMonthId');
        isBroswer && localStorage.removeItem('token');
    }
    // Reset the state
    draft.token = null;
    draft.isAuthenticated = false;
    draft.isLoading = false;
    draft.user = null;
};

// Set the logged in user
export const userLoaded = (draft, user) => {
    draft.isAuthenticated = true;
    draft.isLoading = false;
    draft.user = user;
};

// Set the state if login or register success
export const loginSuccess = (draft, { user: { user, token } }) => {
    // Set the token in local storage
    isBroswer && localStorage.setItem('token', token);
    // Set the state
    draft.token = token;
    draft.user = user;
    draft.isAuthenticated = true;
    draft.isLoading = false;
};
