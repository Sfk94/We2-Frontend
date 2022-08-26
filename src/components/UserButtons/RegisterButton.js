import React, {Component} from "react"
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import {connect} from 'react-redux';
import { bindActionCreators } from "redux";

import * as createActions from "../../actions/CreateUserActions";
import * as userActions from "../../actions/UserListActions";

const mapStateToProps = state => {
    return ({
        allUsers: state.userReducer.users,
        token: state.authenticationReducer.accessToken,
        showCreateDialog: state.createReducer.showCreateDialog,
    })
}

class RegisterButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            userId: "",
            isAdmin: false
        };
        this.openCreateUserModal = this.openCreateUserModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        const { getAllUsersAction } = this.props;
        getAllUsersAction(this.props.token);
    }

    openCreateUserModal(e) {
        e.preventDefault();
        const { showCreateDialogAction } = this.props
        showCreateDialogAction()
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    
    handleSubmit(e) {
        e.preventDefault();
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
        var showCreateDialog = this.props.showCreateDialog;
        return (
            <div>
                <Button id="OpenCreateUserDialogButton" className="fa fa-plus-circle mr-3 fa-fw fa-2x" variant="light" onClick={this.openCreateUserModal}>
                    User anlegen
                </Button>
                <Modal id="UserCreateDialog" show={showCreateDialog} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Neuen User Anlegen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>UserID</Form.Label>
                            <Form.Control id="UserIDInput" type="text" value={this.state.userId} placeholder="UserID eingeben" name="userId" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control id="UserNameInput" type="text" value={this.state.username} placeholder="Username einegeben" name="username" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="PasswordInput" type="password" value={this.state.password} placeholder="Passwort eingeben" name="password" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Button id="CreateUserButton" variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllUsersAction: userActions.getAllUsersDispatch,
    showCreateDialogAction: createActions.getShowCreateDialogAction,
    createUserAction: createActions.createUserDispatch,
    hideDialogAction: userActions.getHideDialogAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterButton);