import React, { Component } from "react";

import * as userActions from "../actions/UserListActions";
import * as deleteActions from "../actions/DeleteActions";
import * as createActions from "../actions/CreateUserActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import RegisterButton from "./UserButtons/RegisterButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import '../layout/css/userManagement.css'

const mapStateToProps = state => {
    return ({
        user: state.authenticationReducer.user,
        allUsers: state.userReducer.users,
        token: state.authenticationReducer.accessToken,
        showEditDialog: state.editReducer.showEditDialog,
        showCreateDialog: state.createReducer.showCreateDialog,
        showDeleteDialog: state.deleteReducer.showDeleteDialog,
    })
}

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            userId: "",
            isAdmin: false
        };
        this.openEditUserModal = this.openEditUserModal.bind(this);
        this.openDeleteUserModal = this.openDeleteUserModal.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { getAllUsersAction } = this.props;
        getAllUsersAction(this.props.token);
    }

    getUsers() {
        var userList = this.props.allUsers.map(user => {
            const id = "UserItem" + user.userID;
            var isAdmin
            if (user.isAdministrator) {
                isAdmin = "Admin"
            }
            else {
                isAdmin = "kein Admin"
            }
            let editButtonID = "EditButton" + user.userID;
            let deleteButtonID = "DeleteButton" + user.userID;
            return (
                <section id="s2">
                    <div class="container2">
                        <div class="left2"></div>
                        <div class="right2">
                            <div class="content2" id={id} key={user._id} user={user}>
                                <h3> User ID: </h3>
                                <p>{user.userID}</p>
                                <h3> User Name: </h3>
                                <p>{user.userName}</p>
                                <p>Status: {isAdmin}</p>
                                <Button variant="primary" id={editButtonID} onClick={() => this.openEditUserModal(user)}>User Bearbeiten</Button>
                                <Button variant="danger" id={deleteButtonID} onClick={() => this.openDeleteUserModal(user)}>User Löschen</Button>
                            </div>
                        </div>
                    </div>
                </section>
            );
        })
        return (
            <div>
                <section id="aboveTheFold2">
                    <div id="aboveTheFoldContent2">
                        <h1>Uer Management</h1>
                        <RegisterButton />
                    </div>
                    {userList}
                </section>
            </div >
        )
    }


    openEditUserModal(user) {
        this.setState({
            username: user.userName,
            userId: user.userID,
            isAdmin: user.isAdministrator
        })
        const { showEditDialogAction } = this.props
        showEditDialogAction()
    }

    openDeleteUserModal(user) {
        this.setState({
            username: user.userName,
            userId: user.userID,
            isAdmin: user.isAdministrator
        })
        const { showDeleteDialogAction } = this.props
        showDeleteDialogAction()
    }

    handleDeleteClose(boolean) {
        if (boolean) {
            const { deleteUserAction } = this.props;
            deleteUserAction(this.props.token, this.state.userId)
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
            const { editUserAction } = this.props;
            editUserAction(this.props.token, this.state);
        }
        if (this.props.showCreateDialog) {
            const { createUserAction } = this.props;
            createUserAction(this.props.token, this.state)
        }
        this.handleClose();
    }

    handleClose() {
        const { hideDialogAction } = this.props
        hideDialogAction()
        this.setState({
            username: "",
            password: "",
            userId: "",
            isAdmin: false
        });
        const { getAllUsersAction } = this.props;
        getAllUsersAction(this.props.token);
    }

    render() {
        var showEditDialog = this.props.showEditDialog;
        var showDeleteDialog = this.props.showDeleteDialog;

        return (
            <div>
                {this.getUsers()}
                <Modal id="UserEditDialog" show={showEditDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>UserID - Editieren nicht erlaubt</Form.Label>
                                <Form.Control id="UserIDInput" type="text" value={this.state.userId} placeholder="Editieren nicht erlaubt" name="userId" disabled />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control id="UserNameInput" type="text" value={this.state.username} placeholder="Enter new Username" name="username" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control id="PasswordInput" type="password" value={this.state.password} placeholder="Enter new passwort" name="password" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Button id="EditUserButton" type="submit" onClick={this.handleSubmit}> Submit</Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showDeleteDialog} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deleting User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Really delete this User? {this.state.userId}</Modal.Body>
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

    //USERLIST
    hideDialogAction: userActions.getHideDialogAction,
    getAllUsersAction: userActions.getAllUsersDispatch,

    //CREATE
    showCreateDialogAction: createActions.getShowCreateDialogAction,
    createUserAction: createActions.createUserDispatch,

    //DELETE
    showDeleteDialogAction: deleteActions.getShowDeleteDialogAction,
    deleteUserAction: deleteActions.deleteUserDispatch,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
