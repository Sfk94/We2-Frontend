import { SHOW_LOGIN_DIALOG, HIDE_LOGIN_DIALOG, AUTHENTICATION_PENDING, AUTHENTICATION_SUCCESS, AUTHENTICATION_ERROR, AUTHENTICATION_LOGOUT, } from '../actions/actions';

const initialState = {
    user: null,
    showLoginDialog: false,
    error: null,
    pending: false,
    accessToken: null
};

function authenticationReducer(state = initialState, action) {
    console.log("Bin im Reducer: " + action.type)
    switch (action.type) {
        case SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }
        case AUTHENTICATION_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }
        case AUTHENTICATION_SUCCESS:
            {
                return {
                    ...state,
                    showLoginDialog: false,
                    pending: false,
                    user: action.user,
                    accessToken: action.accessToken,
                }
            }
        case AUTHENTICATION_ERROR:
            {
                return {
                    ...state,
                    pending: false,
                    error: 'Authentication Fehler',
                }
            }
        case AUTHENTICATION_LOGOUT:
            {
                return {
                    ...state,
                    user: null,
                    accessToken: null,
                }
            }
        default:
            return state;
    }
};

export default authenticationReducer;