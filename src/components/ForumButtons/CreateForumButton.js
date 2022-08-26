import React, { Component } from "react"

import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import * as forumActions from "../../actions/ForumActions";

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


const mapStateToProps = state => {
    return ({
        token: state.authenticationReducer.accessToken,
        user: state.authenticationReducer.user,
        showCreateDialog: state.forumReducer.showCreateDialog,
        error: state.forumReducer.error,
        pending: state.forumReducer.pending
    })
}


class CreateForumButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forumId: "",
            forumname: "",
            ForumDescr: "",
        };

        this.openCreateForumModal = this.openCreateForumModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    openCreateForumModal(e) {
        e.preventDefault();
        const { createDialog } = this.props
        createDialog()
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.showCreateDialog) {
            const { create } = this.props;
            create(this.props.token, this.state)
        }
        this.handleClose();
    }

    handleClose() {
        const { hideDialog } = this.props
        hideDialog()
        this.setState({
            forumId: "",
            forumname: "",
            ForumDescr: ""
        });
    }

    render() {
        var showCreateDialog = this.props.showCreateDialog;

        return (
            <div>
                <Button id="OpenCreateForumDialogButton" className="fa fa-plus-circle mr-3 fa-fw fa-2x" variant="light" onClick={this.openCreateForumModal}>
                    Forum erstellen
                </Button>
                <Modal id="ForumEditDialog" show={showCreateDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forum erstellen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name des Forums</Form.Label>
                                <Form.Control id="ForumNameInput" type="text" value={this.state.forumname} placeholder="Name des Forums..." name="forumname" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Beschreibung</Form.Label>
                                <Form.Control id="ForumDescriptionInput" as="textarea" rows={3} value={this.state.description} placeholder="Beschreibung des Forums..." name="description" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <div className="d-flex align-items-center">
                                    <Button id="CreateForumButton" variant="primary" type="submit" onClick={this.handleSubmit} className="primary-btn">Forum Erstellen</Button>
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
    createDialog: forumActions.getShowCreateDialogAction,
    create: forumActions.createForumDispatch,
    hideDialog: forumActions.getHideDialogAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateForumButton);