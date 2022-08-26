import {DELETE_USER_ERROR, SHOW_DELETE_DIALOG, DELETE_USER_SUCCESS, HIDE_DIALOG, USER_PENDING} from "../actions/actions";

const initialState = {
    users: [],
    pending: false,
    accessToken: null,
    showEditDialog: false,
    showCreateDialog: false,
    showDeleteDialog: false,
}

function deleteReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null
            }
        case DELETE_USER_ERROR:
            return {
                ...state,
                error: "Fehler User löschen"
            }
        case SHOW_DELETE_DIALOG:
            return {
                ...state,
                showDeleteDialog: true,
                error: null
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

export default deleteReducer;