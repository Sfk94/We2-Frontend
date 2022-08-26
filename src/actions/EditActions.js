import { SHOW_EDIT_DIALOG, EDIT_SUCCESS, EDIT_ERROR, USER_PENDING, HIDE_DIALOG} from "./actions";


export function getShowEditDialogAction() {
    return {
        type: SHOW_EDIT_DIALOG
    }
}

export function getEditUserSuccessAction(userSession) {
    return {
        type: EDIT_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getEditUserErrorAction(error) {
    return {
        type: EDIT_ERROR,
        error: error
    }
}

export function getUserPendingAction() {
    return {
        type: USER_PENDING
    }
}

export function getHideDialogAction() {
    return {
        type: HIDE_DIALOG
    }
}

export function editUserDispatch(adminToken, userData) {
    return dispatch => {
        dispatch(getUserPendingAction());
        editUser(adminToken, userData)
            .then(
                userSession => {
                    const action = getEditUserSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getEditUserErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getEditUserErrorAction(error));
            })
    }
}

function editUser(token, userData) {
    var editing;
    editing = JSON.stringify({
        "userID": userData.userId,
        "userName": userData.username,
        "password": userData.password,
        "isAdministrator": userData.isAdmin
    })

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + token, 'Content-Type': 'application/json'
        },
        body: editing
    };

    return fetch('http://localhost:8080/user', requestOptions)
        .then(handleEditResponse)
        .then(userSession => {
            return userSession.user;
        });
}

function handleEditResponse(response) {
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