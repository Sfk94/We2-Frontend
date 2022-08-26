import {DELETE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_FORUM_SUCCESS, DELETE_FORUM_ERROR, SHOW_DELETE_DIALOG, CREATE_USER_SUCCESS, CREATE_USER_ERROR, USER_PENDING} from './actions'

export function getDeleteUserSuccessAction(userSession) {
    return {
        type: DELETE_USER_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getDeleteUserErrorAction(error) {
    return {
        type: DELETE_USER_ERROR,
        error: error
    }
}

export function getDeleteForumSuccessAction(userSession) {
    return {
        type: DELETE_FORUM_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getDeleteForumErrorAction(error) {
    return {
        type: DELETE_FORUM_ERROR,
        error: error
    }
}


export function getShowDeleteDialogAction() {
    return {
        type: SHOW_DELETE_DIALOG
    }
}

export function getCreateUserSuccessAction(userSession) {
    return {
        type: CREATE_USER_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

 export function getCreateUserErrorAction(error) {
    return {
        type: CREATE_USER_ERROR,
        error: error
    }
}

export function getUserPendingAction() {
    return {
        type: USER_PENDING
    }
}

export function deleteUserDispatch(adminToken, userId) {
    return dispatch => {
        dispatch(getUserPendingAction());
        deleteUser(adminToken, userId)
            .then(
                userSession => {
                    const action = getCreateUserSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getCreateUserErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getCreateUserErrorAction(error));
            })
    }
}

function deleteUser(token, userId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + token, 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userID": userId
        })
    };

    return fetch('http://localhost:8080/user', requestOptions)
        .then(handleDeleteResponse)
        .then(userSession => {
            return userSession.user;
        });
}

function handleDeleteResponse(response) {
    return response.json()
        .then((text) => {
            const data = text;

            if (!response.ok) {
                if (response.status === 401 || response.status === 500) {
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            else {
                let userSession = {
                    user: data
                }
                return userSession;
            }
        })
}