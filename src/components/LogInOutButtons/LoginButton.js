import React, {Component} from "react";

import {connect} from 'react-redux';

import{getShowLoginDialogAction} from '../../actions/AuthenticationActions'

import Button from 'react-bootstrap/Button'

class LoginButton extends Component{

    constructor(props){
        super(props);
        this.showLoginDialog = this.showLoginDialog.bind(this);
    }
    
    showLoginDialog() {
        const dispatch = this.props.dispatch;
        dispatch(getShowLoginDialogAction())
    }

    render(){
        return(
            <div>
               <Button id="LoginOpenDialogButton" type="button" variant="light" onClick={this.showLoginDialog}>Login</Button>
            </div>
        )
    }
}

export default connect()(LoginButton)