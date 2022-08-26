import React, {Component} from "react";

import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import{logout} from '../../actions/AuthenticationActions'

import Button from 'react-bootstrap/Button'

class LogoutButton extends Component{

    constructor(props){
        super(props);
        this.showLogoutDialog = this.showLogoutDialog.bind(this);
    }

    showLogoutDialog() {
        const dispatch = this.props.dispatch;
        dispatch(logout())
    }

    render(){
        return(
            <div>
               <Button id="LogoutButton" type="button" variant="light" onClick={this.showLogoutDialog} as={Link} to="/">Logout</Button>
            </div>
        )
    }
}

export default connect()(LogoutButton)