import React, {Component} from "react";

import {connect} from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";


import UserSessionWidget from './UserSessionWidget';

import {Link} from "react-router-dom"

const mapStateToProps = state => {
  return state.authenticationReducer;
}


class TopMenu extends Component {

  render() {
    const user = this.props.user;
    let userManagement;
    let forumManagement;
 
    if (user) {
      userManagement = <Nav.Link as={Link} to="/userManagement" id="OpenUserManagementButton">User Management</Nav.Link>
      forumManagement = <Nav.Link as={Link} to="/forumManagement" id="OpenforumManagementButton">Forum Management</Nav.Link>
    }

    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {userManagement}
                {forumManagement}
              </Nav>
              <UserSessionWidget />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default connect(mapStateToProps)(TopMenu);