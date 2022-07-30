import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_SSO_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach cookies from req to server
instance.defaults.withCredentials = true;

// Bearer token
// instance.defaults.headers.common[
//     "Authorization"
// ] = `Bearer ${localStorage.getItem("jwt")}`;

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
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
export default instance;
