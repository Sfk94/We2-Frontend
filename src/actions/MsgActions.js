import { ALLMSG_SUCCESS, ALLMSG_ERROR, CREATEMSG_SUCCESS, CREATEMSG_ERROR, SHOW_MSGEDIT_DIALOG, SHOW_DELETEMSG_DIALOG, EDIT_MESSAGE_SUCCESS, SHOW_CREATEMSG_DIALOG, EDIT_MESSAGE_ERROR, HIDE_DIALOG, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_ERROR, MESSAGE_PENDING } from "./actions";

//ALL MESSAGES
export function getAllMessagesSuccessAction(messages) {
    return {
        type: ALLMSG_SUCCESS,
        messages: messages
    }
}

export function getAllMessagesErrorAction(error) {
    return {
        type: ALLMSG_ERROR,
        error: error
    }
}

export function getHideDialogAction() {
    return {
        type: HIDE_DIALOG
    }
}

export function getMessagePendingAction() {
    return {
        type: MESSAGE_PENDING
    }
}

export function getAllMessagesDispatch(forumData) {
    return dispatch => {
        dispatch(getMessagePendingAction())
        getAllMessages(forumData)
            .then(
                messages => {
                    const action = getAllMessagesSuccessAction(messages);
                    dispatch(action);
                },
                error => {
                    dispatch(getAllMessagesErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAllMessagesErrorAction(error));
            })
    }
}

export function getAllMessages(forumData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "forumID": forumData._id
        })
    };

    return fetch('http://localhost:8080/forumMessage/getByForumID', requestOptions)
        .then(handleResponse)
        .then(messageSession => {
            return messageSession.message;
        });
}

function handleResponse(response) {
    return response.json()
        .then((text) => {
            const data = text;

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            else {
                let messageSession = {
                    message: data
                }
                return messageSession;
            }
        })
}

//CREATE MESSAGE
export function getShowCreateDialogAction() {
    return {
        type: SHOW_CREATEMSG_DIALOG
    }
}

export function getCreateMessageSuccessAction(message) {
    return {
        type: CREATEMSG_SUCCESS,
        message: message
    }
}

export function getCreateMessageErrorAction(error) {
    return {
        type: CREATEMSG_ERROR,
        error: error
    }
}

export function createMessageDispatch(token, forumId, messageData) {
    return dispatch => {
        dispatch(getMessagePendingAction());
        createMessage(token, forumId, messageData)
            .then(
                forumSession => {
                    const action = getCreateMessageSuccessAction(forumSession);
                    dispatch(action);
                    dispatch(getHideDialogAction());
                },
                error => {
                    dispatch(getCreateMessageErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getCreateMessageErrorAction(error));
            })
    }
}

function createMessage(token, forumId, messageData) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + token, 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "forumID": forumId,
            "messageTitle": messageData.messageTitle,
            "messageText": messageData.messageText
        })
    };

    return fetch('http://localhost:8080/forumMessage', requestOptions)
        .then(handleResponse)
        .then(messageSession => {
            return messageSession.message;
        });
}


//EDIT MESSAGE
export function getShowEditDialogAction() {
    return {
        type: SHOW_MSGEDIT_DIALOG
    }
}

export function getEditMessageSuccessAction(message) {
    return {
        type: EDIT_MESSAGE_SUCCESS,
        message: message
    }
}

export function getEditMessageErrorAction(error) {
    return {
        type: EDIT_MESSAGE_ERROR,
        error: error
    }
}
export function editMessageDispatch(token, messageData) {
    return dispatch => {
        dispatch(getMessagePendingAction());
        editMessage(token, messageData)
            .then(
                message => {
                    const action = getEditMessageSuccessAction(message);
                    dispatch(action);
                    dispatch(getHideDialogAction())
                },
                error => {
                    dispatch(getEditMessageErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getEditMessageErrorAction(error));
            })
    }
}

function editMessage(token, messageData) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + token, 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "_id": messageData.messageID,
            "messageTitle": messageData.messageTitle,
            "messageText": messageData.messageText
        })
    };

    return fetch('http://localhost:8080/forumMessage', requestOptions)
        .then(handleResponse)
        .then(messageSession => {
            return messageSession.message;
        });
}


//DELETE MESSAGE
export function getShowDeleteDialogAction() {
    return {
        type: SHOW_DELETEMSG_DIALOG
    }
}

export function getDeleteMessageSuccessAction(messageId) {
    return {
        type: DELETE_MESSAGE_SUCCESS,
        messageId: messageId
    }
}

export function getDeleteMessageErrorAction(error) {
    return {
        type: DELETE_MESSAGE_ERROR,
        error: error
    }
}


export function deleteMessageDispatch(token, messageId) {
    return dispatch => {
        dispatch(getMessagePendingAction());
        deleteMessage(token, messageId)
            .then(
                message => {
                    const action = getDeleteMessageSuccessAction(messageId);
                    dispatch(action);
                },
                error => {
                    dispatch(getDeleteMessageErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getDeleteMessageErrorAction(error));
            })
    }
}

function deleteMessage(token, messageId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + token, 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "_id": messageId
        })
    };

    return fetch('http://localhost:8080/forumMessage', requestOptions)
        .then(handleDeleteResponse)
        .then(messageSession => {
            return messageSession.message;
        });
}

function handleDeleteResponse(response) {
    return response.text()
        .then((text) => {
            const data = text;

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            else {
                let messageSession = {
                    message: data
                }
                return messageSession;
            }
        })
}