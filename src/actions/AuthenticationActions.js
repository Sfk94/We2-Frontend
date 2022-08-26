import base64 from 'base-64';

import { SHOW_LOGIN_DIALOG, HIDE_LOGIN_DIALOG, AUTHENTICATION_PENDING, AUTHENTICATION_SUCCESS, AUTHENTICATION_ERROR, AUTHENTICATION_LOGOUT,  } from './actions';

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getLogOutAction() {
    return {
        type: AUTHENTICATION_LOGOUT
    }
}


export function getAuthenticationPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getAuthenticationErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function authenticateUser(userID, password) {
    console.log("Authenticate");

    return dispatch => {
        dispatch(getAuthenticationPendingAction());
        login(userID, password)
            .then(
                userSession => {
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getAuthenticationErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error));
            })
    }
}

function login(userID, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Basic " + base64.encode(userID + ":" + password)
        },
    };

    return fetch('http://localhost:8080/authenticate', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        }).catch (e => console.log(e));
}

function handleResponse(response) {
    const authorizationHeader = response.headers.get("Authorization");

    var data;
    var token;
    if (authorizationHeader) {
        token = authorizationHeader.split(" ")[1];
        const payload = JSON.parse(Buffer.from(token.split(".")[1], 'base64'));
        data = payload;
        console.log("data: " + JSON.stringify(data))
    }

    if (!response.ok) {
        if (response.status === 401 || response.status === 500) {
            logout();
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    else {
        let userSession = {
            user: data,
            accessToken: token
        }
        return userSession;
    }

}

export function logout() {
    return dispatch => {
        dispatch(getLogOutAction());
    }
}
