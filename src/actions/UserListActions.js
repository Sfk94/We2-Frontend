import {HIDE_DIALOG,  ALLUSERS_SUCCESS, ALLUSERS_ERROR, USER_PENDING } from "./actions";

export function getAllUsersSuccessAction(userSession) {
    return {
        type: ALLUSERS_SUCCESS,
        users: userSession
    }
}

export function getAllUsersErrorAction(error) {
    return {
        type: ALLUSERS_ERROR,
        error: error
    }
}

export function getHideDialogAction() {
    return {
        type: HIDE_DIALOG
    }
}

export function getUserPendingAction() {
    return {
        type: USER_PENDING
    }
}

export function getAllUsersDispatch(adminToken) {
    return dispatch => {
        getAllUsers(adminToken)
            .then(
                userSession => {
                    const action = getAllUsersSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getAllUsersErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAllUsersErrorAction(error));
            })
    }
}

export function getAllUsers(adminToken) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + adminToken
        }
    };

    return fetch('http://localhost:8080/user', requestOptions)
        .then(handleUsersResponse)
        .then(userSession => {
            return userSession.users;
        });
}

function handleUsersResponse(response) {
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
                    users: data
                }
                return userSession;
            }
        })
}
