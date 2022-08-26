import {HIDE_DIALOG, ALLUSERS_SUCCESS, ALLUSERS_ERROR, USER_PENDING } from "../actions/actions";

const initialState = {
    users: [],
    pending: false,
    accessToken: null,
    showEditDialog: false,
    showCreateDialog: false,
    showDeleteDialog: false,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ALLUSERS_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                users: action.users
            }
        case ALLUSERS_ERROR:
            return {
                ...state,
                error: "Fehler alle User"
            }
    
        case USER_PENDING:
            return {
                ...state,
                pending: true,
            }
        case HIDE_DIALOG:
            return {
                ...state,
                pending: false,
                showEditDialog: false,
                showCreateDialog: false,
                showDeleteDialog: false,
                error: null
            }
        default:
            return state;
    }
}

export default userReducer;