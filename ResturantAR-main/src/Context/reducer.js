let user = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).user
    : "";
let token = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).auth_token
    : "";

export const initialState = {
    userDetails: "" || user,
    token: "" || token,
    errorMessage: null
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.auth_token
            };
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
                token: ""
            };
        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};