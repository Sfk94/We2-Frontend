import React, { Component } from "react"

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import * as msgActions from "../../actions/MsgActions";

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const mapStateToProps = state => {
    return ({
        token: state.authenticationReducer.accessToken,
        user: state.authenticationReducer.user,
        forum: state.forumReducer.showForum,
        showCreateDialog: state.msgReducer.showCreateDialog,
    })
}

class CreateMsgButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageID: null,
            messageTitle: "",
            messageText: "",
        };
       
        this.openCreateMessageModal = this.openCreateMessageModal.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
    }

    openCreateMessageModal(e) {
        e.preventDefault();
        const { showCreateDialogAction } = this.props
        showCreateDialogAction()
    }

    handleCreateSubmit(e) {
        e.preventDefault();
        const { createMessageAction } = this.props;
        createMessageAction(this.props.token, this.props.forum._id, this.state)
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

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    render() {
        var showCreateDialog = this.props.showCreateDialog;

        return (
            <div>
               <Button id="OpenCreateMessageDialogButton" onClick={this.openCreateMessageModal} variant="light">Create Message</Button>
               <Modal id="MessageEditDialog" show={showCreateDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message erstellen</Modal.Title>
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
                                    <Button id="CreateMessageButton" variant="primary" type="submit" onClick={this.handleCreateSubmit} className="primary-btn">Submit</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal> 
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showCreateDialogAction: msgActions.getShowCreateDialogAction,
    createMessageAction: msgActions.createMessageDispatch,
    hideDialogAction: msgActions.getHideDialogAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateMsgButton);