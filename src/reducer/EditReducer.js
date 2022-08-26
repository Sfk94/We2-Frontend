import { SHOW_EDIT_DIALOG, EDIT_SUCCESS, EDIT_ERROR, HIDE_DIALOG, USER_PENDING } from "../actions/actions";

const initialState = {
    users: [],
    pending: false,
    accessToken: null,
    showEditDialog: false,
    showCreateDialog: false,
    showDeleteDialog: false,
}

function editReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_EDIT_DIALOG:
            return {
                ...state,
                showEditDialog: true,
                error: null
            }
        case EDIT_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                pending: false,
                error: null
            }
        case EDIT_ERROR:
            return {
                ...state,
                pending: false,
                error: "Fehler Editieren User"
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

export default editReducer;