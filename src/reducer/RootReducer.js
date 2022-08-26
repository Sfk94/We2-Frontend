import { combineReducers } from "redux";
import authenticationReducer from "./AuthenticationReducer";

//UserManagement
import userReducer from "./UserReducer"
import deleteReducer from "./DeleteReducer"
import createReducer from "./CreateUserReducer"
import editReducer from "./EditReducer"

//Forum
import forumReducer from "./ForumReducer"

//Messages
import msgReducer from "./MsgReducer"


const rootReducer = combineReducers({
    authenticationReducer,
    userReducer,
    createReducer,
    editReducer,
    deleteReducer,
    msgReducer,
    forumReducer
});

export default rootReducer;