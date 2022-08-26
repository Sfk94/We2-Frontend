import { ALLFORUMS_SUCCESS,EDITFORUM_SUCCESS, EDITFORUM_ERROR,SHOW_FORUM,ALLFORUMS_ERROR, CREATE_NEW_ERROR, CREATE_NEW_SUCCESS,SHOW_DELETE_FORUM_DIALOG,SHOW_CREATE_FORUM_DIALOG,SHOW_EDIT_FORUM_DIALOG, DELETE_FORUM_SUCCESS, DELETE_FORUM_ERROR, FORUM_PENDING, HIDE_DIALOG} from "./actions";

//ALL FORUMS
export function getAllForumsSuccessAction(forums) {
    return {
        type: ALLFORUMS_SUCCESS,
        forums: forums
    }
}

export function getAllForumsErrorAction(error) {
    return {
        type: ALLFORUMS_ERROR,
        error: error
    }
} 

export function getHideDialogAction() {
    return {
        type: HIDE_DIALOG
    }
}

export function getForumPendingAction() {
    return {
        type: FORUM_PENDING
    }
}

export function getShowForumAction(forum){
    return {
        type: SHOW_FORUM,
        forum: forum
    }
}

export function getAllForumsDispatch(token) {
    return dispatch => {
        getAllForums(token)
            .then(
                forums => {
                    const action = getAllForumsSuccessAction(forums);
                    dispatch(action);
                },
                error => {
                    dispatch(getAllForumsErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAllForumsErrorAction(error));
            })
    }
}

export function getAllForums() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch('http://localhost:8080/forum', requestOptions)
        .then(handleResponse)
        .then(forumSession => {
            return forumSession.forum;
        });
} 

//CREATE FORUM
export function getShowCreateDialogAction() {
    return {
        type: SHOW_CREATE_FORUM_DIALOG
    }
}

export function getCreateForumSuccessAction(forum) {
    return {
        type: CREATE_NEW_SUCCESS,
        forum: forum
    }
}

export function getCreateForumErrorAction(error) {
    return {
        type: CREATE_NEW_ERROR,
        error: error
    }
}

export function createForumDispatch(adminToken, forumData){
    return dispatch => {
        dispatch(getForumPendingAction());
        createForum(adminToken,forumData)
            .then(
                forumSession => {
                    const action = getCreateForumSuccessAction(forumSession);
                    dispatch(action);
                },
                error => {
                    console.log("Error: "+error);
                    dispatch(getCreateForumErrorAction(error));
                }
            )
            .catch(error => {
                console.log("catch Error: "+error);
                dispatch(getCreateForumErrorAction(error));
            })
    }
}

function createForum(token, forumData){
    console.log("Forumdata in Forumaction: "+JSON.stringify(forumData))
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "forumName": forumData.forumname,
            "forumDescription": forumData.description
        })
    };

    return fetch('http://localhost:8080/forum', requestOptions)
        .then(handleResponse)
        .then(forumSession => {
            return forumSession.forum;
        });
}


//EDIT FORUM
export function getShowEditDialogAction() {
    return {
        type: SHOW_EDIT_FORUM_DIALOG
    }
}

export function getEditForumSuccessAction(forum) {
    return {
        type: EDITFORUM_SUCCESS,
        forum: forum
    }
}

export function getEditForumErrorAction(error) {
    return {
        type: EDITFORUM_ERROR,
        error: error
    }
}

export function editForumDispatch(adminToken, forumData) {
    return dispatch => {
        dispatch(getForumPendingAction());
        editForum(adminToken,forumData)
            .then(
                forum => {
                    const action = getEditForumSuccessAction(forum);
                    dispatch(action);
                },
                error => {
                    console.log("Error: "+error);
                    dispatch(getEditForumErrorAction(error));
                }
            )
            .catch(error => {
                console.log("catch Error: "+error);
                dispatch(getEditForumErrorAction(error));
            })
    }
}

function editForum(token, forumData){
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "_id": forumData.forumId,
            "forumName": forumData.forumname,
            "forumDescription": forumData.description
        })
    };

    return fetch('http://localhost:8080/forum', requestOptions)
        .then(handleResponse)
        .then(forumSession => {
            return forumSession.forum;
        });
}

//DELETE FORUM
export function getShowDeleteDialogAction() {
    return {
        type: SHOW_DELETE_FORUM_DIALOG
    }
} 


export function getDeleteForumSuccessAction(forum) {
    return {
        type: DELETE_FORUM_SUCCESS,
        forum: forum
    }
}

export function getDeleteForumErrorAction(error) {
    return {
        type: DELETE_FORUM_ERROR,
        error: error
    }
}


 export function deleteForumDispatch(adminToken, forumId){
    return dispatch => {
        dispatch(getForumPendingAction());
        deleteForum(adminToken,forumId)
            .then(
                forum => {
                    const action = getDeleteForumSuccessAction(forum);
                    dispatch(action);
                },
                error => {
                    dispatch(getDeleteForumErrorAction(error));
                }
            )
            .catch(error => {
                console.log("catch Error: "+error);
                dispatch(getDeleteForumErrorAction(error));
            })
    }
}
 
 function deleteForum(token, forumId){
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "_id": forumId
        })
    };

    return fetch('http://localhost:8080/forum', requestOptions)
        .then(handleResponse)
        .then(forumSession => {
            return forumSession.forum;
        });
}
 

function handleResponse(response) {
    return response.json()
        .then((text) => {
            const data = text;
            console.log("data in ForumAction: " + JSON.stringify(data));

            if (!response.ok) {
                if (response.status === 401 || response.status === 500) {
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            else {
                let forumSession = {
                    forum: data
                }
                return forumSession;
            }
        })
}