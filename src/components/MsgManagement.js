import React, { Component } from "react";

import * as messagesActions from "../actions/MsgActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import CreateMsgButton from "./MsgButtons/CreateMsgButton";

import "../layout/css/forum.css"


const mapStateToProps = state => {
    return ({
        token: state.authenticationReducer.accessToken,
        user: state.authenticationReducer.user,
        forum: state.forumReducer.showForum,
        msgForum: state.msgReducer.messages,
        msgEditDialog: state.msgReducer.showEditDialog,
        showDeleteDialog: state.msgReducer.showDeleteDialog,
    })
}

class MessagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageID: null,
            messageTitle: "",
            messageText: "",
            authorId: ""
        };
        this.getMessages = this.getMessages.bind(this);
        this.openEditMessageModal = this.openEditMessageModal.bind(this);
        this.openDeleteMessageModal = this.openDeleteMessageModal.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("Component Did Mount....")
        this.setState({
            authorId: this.props.user.userID
        })
        const { getAllMessagesAction } = this.props;
        getAllMessagesAction(this.props.forum)
    }

    getMessages() {
        var messageList = this.props.msgForum.map(message => {
            const id = "MessageItem" + message._id;

            let editButtonID = "EditButton" + message._id;
            let deleteButtonID = "DeleteButton" + message._id;

            let editButton;
            let deleteButton;

            if (this.props.user.userID === message.authorID || this.props.user.isAdministrator) {
                editButton = <Button variant="primary" id={editButtonID} onClick={() => this.openEditMessageModal(message)}>Message Bearbeiten</Button>
                deleteButton = <Button variant="danger" id={deleteButtonID} onClick={() => this.openDeleteMessageModal(message)}>Message löschen</Button>
            }

            return (
                <div class="containerMsg">
                    <div class="bubbles">
                        <div class="bubble">
                            <div class="bubble-text-wrapper" id={id} key={message._id} forum={message}>
                                <h1>Messages zum Forum "{this.props.forum.forumName}"</h1>
                                <h2 class="bubble-text">Überschrift Message: {message.messageTitle}</h2>
                                <h3 class="bubble-text">Message:</h3>
                                <p class="bubble-text">{message.messageText}</p>
                                {editButton}
                                {deleteButton}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <section id="aboveTheFoldMsg">
                    <div id="aboveTheFoldContentMsg">
                        <h1>Message Center für das Forum "{this.props.forum.forumName}" </h1>
                        <CreateMsgButton />
                    </div>
                    {messageList}
                </section>
            </div>
        )
    }

    openEditMessageModal(message) {
        this.setState({
            messageID: message._id,
            messageTitle: message.messageTitle,
            messageText: message.messageText,
            authorId: message.authorID
        })
        const { showEditDialogAction } = this.props
        showEditDialogAction()
    }

    openDeleteMessageModal(message) {
        this.setState({
            messageID: message._id,
            messageTitle: message.messageTitle,
            messageText: message.messageText,
            authorId: message.authorID
        })
        const { showDeleteDialogAction } = this.props
        showDeleteDialogAction()
    }

    handleDeleteClose(boolean) {
        if (boolean) {
            const { deleteMessageAction } = this.props;
            deleteMessageAction(this.props.token, this.state.messageID)
        }
        this.handleClose();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }


    handleEditSubmit(e) {
        e.preventDefault();
        const { editMessageAction } = this.props;
        editMessageAction(this.props.token, this.state);
    }

    handleClose() {
        const { hideDialogAction } = this.props;
        hideDialogAction();
        this.setState({
            messageID: null,
            messageTitle: "",
            messageText: ""
        })
    }

    render() {
        var showDeleteDialog = this.props.showDeleteDialog;
        var msgEditDialog = this.props.msgEditDialog;

        return (
            <div>

                {this.getMessages()}


                <Modal id="MessageEditDialog" show={msgEditDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Message Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Überschrift</Form.Label>
                                <Form.Control id="messageTitleInput" type="text" value={this.state.messageTitle} placeholder="Titel..." name="messageTitle" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Deine Message</Form.Label>
                                <Form.Control id="messageTextInput" as="textarea" rows={3} value={this.state.messageText} placeholder="Nachricht eingeben..." name="messageText" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <div className="d-flex align-items-center">
                                    <Button id="CreateMessageButton" variant="primary" type="submit" onClick={this.handleEditSubmit} className="primary-btn">Submit</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showDeleteDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message Löschen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Diese Message "{this.state.messageTitle}" wirklich löschen? </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.handleDeleteClose(true)}>Yes</Button>
                        <Button variant="secondary" onClick={() => this.handleDeleteClose(false)}>No</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllMessagesAction: messagesActions.getAllMessagesDispatch,
    showDeleteDialogAction: messagesActions.getShowDeleteDialogAction,
    deleteMessageAction: messagesActions.deleteMessageDispatch,
    showEditDialogAction: messagesActions.getShowEditDialogAction,
    editMessageAction: messagesActions.editMessageDispatch,
    hideDialogAction: messagesActions.getHideDialogAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage);