import React, { Component } from "react";

import * as forumActions from "../actions/ForumActions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { Link } from "react-router-dom";

import CreateForumButton from "./ForumButtons/CreateForumButton";




const mapStateToProps = state => {
    return ({
        token: state.authenticationReducer.accessToken,
        user: state.authenticationReducer.user,
        allForums: state.forumReducer.forums,
        showEditDialog: state.forumReducer.showEditDialog,
        showDeleteDialog: state.forumReducer.showDeleteDialog,
        error: state.forumReducer.error,
        pending: state.forumReducer.pending
    })
}

class ForumManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forumId: "",
            forumname: "",
            description: ""
        };
        this.openEditForumModal = this.openEditForumModal.bind(this);
        this.openDeleteForumModal = this.openDeleteForumModal.bind(this);
        this.getForums = this.getForums.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.msgForForum = this.msgForForum.bind(this);
    }

    componentDidMount() {
        const { getAllForumsAction } = this.props;
        getAllForumsAction(this.props.token);
    }

    getForums() {
        var forumList = this.props.allForums.map(forum => {
            const id = "ForumItem" + forum._id;
            let editButtonID = "EditButton" + forum._id;
            let deleteButtonID = "DeleteButton" + forum._id;
            return (
                <section id="s4">
                    <div class="container4">
                        <div class="left4"><Link to="/forumManagement/msgManagement" onClick={() => this.msgForForum(forum)}>
                            <Button variant="success" id={"MessageButton" + forum._id}>Messages</Button>
                        </Link></div>
                        <div class="right4">
                            <div class="content4" id={id} key={forum._id} forum={forum}>
                                <h3> Forum: {forum.forumName} </h3>
                                <h3> Description: </h3>
                                <p>{forum.forumDescription}</p>
                                <Button variant="primary" id={editButtonID} onClick={() => this.openEditForumModal(forum)}>Forum Bearbeiten</Button>
                                <Button variant="danger" id={deleteButtonID} onClick={() => this.openDeleteForumModal(forum)}>Froum Löschen</Button>

                            </div>
                        </div>
                    </div>
                </section>
            )
        })
        return (
            <div>
                <section id="aboveTheFoldForum">
                    <div id="aboveTheFoldContentForum">
                        <h1>Foren</h1>
                        <CreateForumButton />
                    </div>
                    {forumList}
                </section>
            </div >
        )
    }

    openEditForumModal(forum) {
        this.setState({
            forumId: forum._id,
            forumname: forum.forumName,
            description: forum.forumDescription,
        })
        const { editDialog } = this.props
        editDialog()
    }

    openDeleteForumModal(forum) {
        this.setState({
            forumId: forum._id,
            forumname: forum.forumName,
            description: forum.forumDescription,
        })
        const { deleteDialog } = this.props
        deleteDialog()
    }

    handleDeleteClose(boolean) {
        if (boolean) {
            const { deleteForumAction } = this.props;
            deleteForumAction(this.props.token, this.state.forumId)
        }
        this.handleClose();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.showEditDialog) {
            const { edit } = this.props;
            edit(this.props.token, this.state);
        }
        if (this.props.showCreateDialog) {
            const { createForumAction } = this.props;
            createForumAction(this.props.token, this.state)
        }
        this.handleClose();
    }

    handleClose() {
        const { hideDialog } = this.props
        hideDialog()
        this.setState({
            forumId: "",
            forumname: "",
            description: ""
        });
    }

    msgForForum(forum) {
        const { showForumAction } = this.props
        showForumAction(forum)
    }

    render() {
        var showEditDialog = this.props.showEditDialog;
        var showDeleteDialog = this.props.showDeleteDialog;
        return (
            <div>
                {this.getForums()}
                <Modal id="ForumEditDialog" show={showEditDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forum Editieren</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name des Forums</Form.Label>
                                <Form.Control id="ForumNameInput" type="text" value={this.state.forumname} placeholder="Name...." name="forumname" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Beschreibung</Form.Label>
                                <Form.Control id="ForumDescriptionInput" as="textarea" rows={3} value={this.state.description} placeholder="Beschreibung...." name="description" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <div className="d-flex align-items-center">
                                    <Button id="EditForumButton" variant="primary" type="submit" onClick={this.handleSubmit} className="primary-btn">Submit</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showDeleteDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forum löschen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Forum "{this.state.forumname}" wirklich löschen?</Modal.Body>
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
    //GET FORUMS
    getAllForumsAction: forumActions.getAllForumsDispatch,

    //EDIT FORUM
    editDialog: forumActions.getShowEditDialogAction,
    edit: forumActions.editForumDispatch,
    
    //DELETE FORUM
    deleteDialog: forumActions.getShowDeleteDialogAction,
    deleteForumAction: forumActions.deleteForumDispatch,

    hideDialog: forumActions.getHideDialogAction,
    showForumAction: forumActions.getShowForumAction,



}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ForumManagement);
