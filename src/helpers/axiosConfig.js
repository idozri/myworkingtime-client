// Setup config/headers and token
export const axiosConfig = token => {
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};
