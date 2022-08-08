import axiosClient from "../../setup/axios";
import {
    USER_GET_ACCOUNT_FAILSED,
    USER_GET_ACCOUNT_REQUEST,
    USER_GET_ACCOUNT_SUCCESS,
    USER_LOGIN_FAILSED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_FAILSED,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
} from "./actionTypes";

//Middleware redux thunk have 3 status: Start -> Doing -> Finish
export const doLogin = ssoToken => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOGIN_REQUEST });
        axiosClient
            .post(process.env.REACT_APP_BACKEND_SSO_VERIFY_TOKEN, {
                ssoToken,
            })
            .then(res => {
                if (res && +res.errorCode === 0) {
                    dispatch({ type: USER_LOGIN_SUCCESS, user: res.data });
                    dispatch(doGetAccount());
                } else {
                    dispatch({
                        type: USER_LOGIN_FAILSED,
                        error: res.errorMessage,
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: USER_LOGIN_FAILSED,
                    error: "Somethings wrong when verify sso token...",
                });
            });
    };
};

export const doGetAccount = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_GET_ACCOUNT_REQUEST });
        axiosClient
            .get(process.env.REACT_APP_BACKEND_SSO_GET_ACCOUNT)
            .then(res => {
                if (
                    (res && +res.errorCode === 0) ||
                    (res.access_token && res.refresh_token)
                ) {
                    dispatch({
                        type: USER_GET_ACCOUNT_SUCCESS,
                        user: res.data ? res.data : res,
                    });
                } else {
                    dispatch({
                        type: USER_GET_ACCOUNT_FAILSED,
                        error: res.errorMessage,
                    });
                    // return SSO login page
                    if (window.location.pathname !== "/") {
                        window.location.href = `${process.env.REACT_APP_BACKEND_SSO_LOGIN}?serviceURL=${process.env.REACT_APP_CURRENT_PROJECT_URL}`;
                    }
                }
            })
            .catch(err => {
                dispatch({
                    type: USER_GET_ACCOUNT_FAILSED,
                    error: "Somethings wrong when get user account...",
                });
            });
    };
};

export const doLogout = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOGOUT_REQUEST });
        axiosClient
            .get(process.env.REACT_APP_BACKEND_SSO_LOGOUT)
            .then(res => {
                if (res && +res.errorCode === 0) {
                    dispatch({ type: USER_LOGOUT_SUCCESS });
                    window.location.href = "/";
                } else {
                    dispatch({
                        type: USER_LOGOUT_FAILSED,
                        error: res.errorMessage,
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: USER_LOGIN_FAILSED,
                    error: "Somethings wrong when logout...",
                });
                console.log(">>> check doLogout action err", err);
            });
    };
};
