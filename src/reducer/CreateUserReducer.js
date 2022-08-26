import { SHOW_CREATE_DIALOG, HIDE_DIALOG, CREATE_USER_SUCCESS, CREATE_USER_ERROR, USER_PENDING } from "../actions/actions";

const initialState = {
    users: [],
    pending: false,
    accessToken: null,
    showEditDialog: false,
    showCreateDialog: false,
    showDeleteDialog: false,
}

function createReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_CREATE_DIALOG:                        
            return {
                ...state,
                showCreateDialog: true,
                error: null
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                showCreateDialog: false,
                pending: false,
                error: null
            }
        case CREATE_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: "Fehler User erstellen"
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

export default createReducer;