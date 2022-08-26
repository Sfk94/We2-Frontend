import { SHOW_CREATE_DIALOG, CREATE_USER_SUCCESS, CREATE_USER_ERROR, USER_PENDING} from "./actions";


export function getShowCreateDialogAction() {
    return {
        type: SHOW_CREATE_DIALOG
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

export function createUserDispatch(adminToken, userData) {
    return dispatch => {
        dispatch(getUserPendingAction());
        createUser(adminToken, userData)
            .then(
                userSession => {
                    const action = getCreateUserSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    console.log("Error: " + error);
                    dispatch(getCreateUserErrorAction(error));
                }
            )
            .catch(error => {
                console.log("Error: " + error);
                dispatch(getCreateUserErrorAction(error));
            })
    }
}

function createUser(token, userData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token, 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userID": userData.userId,
            "userName": userData.username,
            "password": userData.password,
            "isAdministrator": userData.isAdmin
        })
    };

    return fetch('http://localhost:8080/user', requestOptions)
        .then(handleCreateResponse)
        .then(userSession => {
            return userSession.user;
        });
}

function handleCreateResponse(response) {
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