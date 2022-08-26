import {ALLMSG_SUCCESS, ALLMSG_ERROR, SHOW_MSGEDIT_DIALOG, CREATEMSG_SUCCESS, CREATEMSG_ERROR,SHOW_CREATEMSG_DIALOG, SHOW_DELETEMSG_DIALOG, EDIT_MESSAGE_SUCCESS, EDIT_MESSAGE_ERROR, HIDE_DIALOG, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_ERROR, MESSAGE_PENDING } from "../actions/actions";

const initialState = {
    messages: [],
    error: null,
    pending: false,
    showEditDialog: false,
    showCreateDialog: false,
    showDeleteDialog: false
};

function msgReducer(state = initialState, action) {

    switch (action.type) {

        //ALL MESSAGES
        case ALLMSG_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                messages: action.messages
            }
        case ALLMSG_ERROR:
            return {
                ...state,
                error: "Fehler alle Messages"
            }

        //CREATE MSG
        case SHOW_CREATEMSG_DIALOG:
            return {
                ...state,
                showCreateDialog: true,
                error: null
            }
        case CREATEMSG_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                messages: [...state.messages, action.message]
            }
        case CREATEMSG_ERROR:
            return {
                ...state,
                pending: false,
                error: "Fehler Message erstellen"
            }

        //EDIT MSG
        case SHOW_MSGEDIT_DIALOG:
            return {
                ...state,
                showEditDialog: true,
                error: null
            }
        case EDIT_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: state.messages.map(message => message._id === action.message._id ? action.message : message),
                showLoginDialog: false,
                pending: false,
                error: null
            }
        case EDIT_MESSAGE_ERROR:
            return {
                ...state,
                pending: false,
                error: "Fehler Message editieren"
            }

        //DELETE MSG
        case SHOW_DELETEMSG_DIALOG:
            return {
                ...state,
                showDeleteDialog: true,
                error: null
            }
        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: state.messages.filter(message => message._id !== action.messageId),
                pending: false,
                error: null
            }
        case DELETE_MESSAGE_ERROR:
            return {
                ...state,
                error: "Fehler Message löschen"
            }

        case MESSAGE_PENDING:
            return {
                ...state,
                pending: true
            }

        case HIDE_DIALOG:
            return {
                ...state,
                showEditDialog: false,
                pending: false,
                showCreateDialog: false,
                showDeleteDialog: false,
                error: null
            }
        default:
            return state;
    }
};

export default msgReducer;