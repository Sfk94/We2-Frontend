import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import TopMenu from './components/TopMenu';
import PublicPage from './components/PublicPage';
import PrivatePage from './components/PrivatePage';
import UserManagement from './components/UserManagement';
import ForumManagement from './components/ForumManagement';
import MsgManagement from './components/MsgManagement';


const mapStateToProps = state => {
  return state.authenticationReducer
}

class App extends Component {
  render() {
    const user = this.props.user
    let workspace;
    let userManagement;
    let forumManagement;
    let msgManagement;

    if (user) {
      workspace = <PrivatePage />
      if (user.isAdministrator) {
        userManagement = <UserManagement />
        forumManagement = <ForumManagement />
        msgManagement = <MsgManagement />
      }
    }
    else {
      workspace = <PublicPage />
    }
    return (
      <Router>
        <div className="App">
          <TopMenu />
          <Routes>
            <Route exact path="/" element={workspace} />
            <Route exact path="/UserManagement" element={userManagement} />
            <Route exact path="/forumManagement" element={forumManagement} />
            <Route exact path="/forumManagement/msgManagement" element={msgManagement} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
