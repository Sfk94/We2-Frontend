import { ALLFORUMS_ERROR, EDITFORUM_SUCCESS, EDITFORUM_ERROR, SHOW_FORUM, SHOW_DELETE_FORUM_DIALOG, SHOW_EDIT_FORUM_DIALOG, CREATE_NEW_SUCCESS, CREATE_NEW_ERROR, SHOW_CREATE_FORUM_DIALOG, DELETE_FORUM_SUCCESS, DELETE_FORUM_ERROR, FORUM_PENDING, HIDE_DIALOG, ALLFORUMS_SUCCESS } from "../actions/actions";

const initialState = {
    forums: [],
    pending: false,
    showEditDialog: false,
    showCreateDialog: false,
    showDeleteDialog: false,
    showForum: null
}

function forumReducer(state = initialState, action) {
    switch (action.type) {
        //GET FORUMS
        case ALLFORUMS_SUCCESS:
            return {
                ...state,
                pending: false,
                error: null,
                forums: action.forums
            }
        case ALLFORUMS_ERROR:
            return {
                ...state,
                error: "Fehler get AllForum"
            }

        //EDIT FORUMS
        case SHOW_EDIT_FORUM_DIALOG:
            return {
                ...state,
                showEditDialog: true,
                error: null
            }
        case EDITFORUM_SUCCESS:
            return {
                ...state,
                forums: state.forums.map(forum => forum._id === action.forum._id ? action.forum : forum),
                showLoginDialog: false,
                pending: false,
                error: null
            }
        case EDITFORUM_ERROR:
            return {
                ...state,
                pending: false,
                error: "Fehler Edit Forum"
            }

        //CREATE FORUMS
        case SHOW_CREATE_FORUM_DIALOG:
            return {
                ...state,
                showCreateDialog: true,
                error: null
            }
        case CREATE_NEW_SUCCESS:
            return {
                ...state,
                forums: [...state.forums, action.forum],
                showCreateDialog: false,
                pending: false,
                error: null
            }
        case CREATE_NEW_ERROR:
            return {
                ...state,
                pending: false,
                error: "Fehler Forum erstellen"
            }


        //DELETE FORUMS
        case DELETE_FORUM_SUCCESS:
            return {
                ...state,
                forums: state.forums.filter(forum => forum._id !== action.forum._id),
                pending: false,
                error: null
            }
        case DELETE_FORUM_ERROR:
            return {
                ...state,
                error: "Fehler Forum löschen"
            }
        case SHOW_DELETE_FORUM_DIALOG:
            return {
                ...state,
                showDeleteDialog: true,
                error: null
            }
        case FORUM_PENDING:
            return {
                ...state,
                pending: true,
            }

        case SHOW_FORUM:
            return {
                ...state,
                showForum: action.forum
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

export default forumReducer;