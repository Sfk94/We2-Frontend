import React, { Component } from "react";

import { Link } from "react-router-dom"
import Nav from "react-bootstrap/Nav";


class PrivatePage extends Component {

    render() {
        let userManagement;
        let forumManagement;

        userManagement = <Nav.Link as={Link} to="/userManagement" id="OpenUserManagementButton">User Management</Nav.Link>
        forumManagement = <Nav.Link as={Link} to="/forumManagement" id="OpenforumManagementButton">Forum Management </Nav.Link>

        return (
        <div>
            <div className="page-content" id="PrivatePage" style={{ background: 'black' }}>
                <section id="aboveTheFold2">
                    <div id="aboveTheFoldContent2">
                        <h1>Eingeloggt</h1>
                        <h2>{forumManagement}</h2>
                        <h2>{userManagement}</h2>
                    </div>
                </section>
            </div>

            <section id="mainContentPriv" style={{ background: 'black' }}>
            <div class="containerMsg">
            <div class="bubbles">
                <div class="bubble">
            <h1>Willkomen im Forum</h1>
            <p class="bubble-text">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
              sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
              At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
              no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
          </div>
    </div>
    </div>
    </section>
    </div>
    
        )
    }
}

export default PrivatePage