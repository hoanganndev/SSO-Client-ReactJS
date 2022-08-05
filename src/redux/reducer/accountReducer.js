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
} from "../actions/actionTypes";

const INITIAL_STATE = {
    userInfo: {
        access_token: "",
        refresh_token: "",
        email: "",
        username: "",
        groupWithRoles: {},
    },
    isLoading: false,
    errMessage: "",
};

const accountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                errMessage: "",
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfo: action.user,
                isLoading: false,
                errMessage: "",
            };
        case USER_LOGIN_FAILSED:
            return {
                ...state,
                isLoading: false,
                errMessage: action.error,
            };
        case USER_LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                errMessage: "",
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                userInfo: {
                    access_token: "",
                    email: "",
                    groupWithRoles: {},
                    refresh_token: "",
                    username: "",
                },
                isLoading: false,
                errMessage: "",
            };
        case USER_LOGOUT_FAILSED:
            return {
                ...state,
                isLoading: false,
                errMessage: action.error,
            };
        case USER_GET_ACCOUNT_REQUEST:
            return {
                ...state,
                isLoading: true,
                errMessage: "",
            };
        case USER_GET_ACCOUNT_SUCCESS:
            console.log(">>> check me check check ");
            return {
                ...state,
                userInfo: action.user,
                isLoading: false,
                errMessage: "",
            };
        case USER_GET_ACCOUNT_FAILSED:
            return {
                ...state,
                isLoading: false,
                errMessage: action.error,
            };
        default:
            return state;
    }
};

export default accountReducer;
