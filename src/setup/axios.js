import axios from "axios";
import { toast } from "react-toastify";
import axiosRetry from "axios-retry";

// Use the Redux store in non-component files
let store;
export const injectStore = _store => {
    store = _store;
};

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SSO_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Custom retry
axiosRetry(axiosInstance, {
    retries: 3,
    retryCondition: error => {
        return error.response.status === 400 || error.response.status === 405;
    },
    retryDelay: (retryCount, error) => {
        return retryCount * 1000;
    },
});

// Automatically attach cookies from req to server
axiosInstance.defaults.withCredentials = true;

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Get access_token from redux
        let headerToken =
            store.getState()?.account?.userInfo?.access_token ?? "";
        if (headerToken) {
            config.headers.Authorization = `Bearer ${headerToken}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        return response && response.data ? response.data : response;
    },
    function (error) {
        const status = error && error.response ? error.response.status : 500;
        switch (status) {
            // authentication (token related issues)
            case 401: {
                // when the path is one of these below, no message is displayed
                if (
                    window.location.pathname !== "/" &&
                    window.location.pathname !== "/login" &&
                    window.location.pathname !== "/register"
                ) {
                    toast.error(error.response.data.errorMessage);
                }
                return error.response.data;
            }

            // forbidden (permission related issues)
            case 403: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            // bad request
            case 400: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            // not found
            case 404: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            // conflict
            case 409: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            // unprocessable
            case 422: {
                toast.error(error.response.data.errorMessage);
                return error.response.data;
            }

            // generic api error (server related) unexpected
            default: {
                return error.response;
            }
        }
    }
);
export default axiosInstance;
