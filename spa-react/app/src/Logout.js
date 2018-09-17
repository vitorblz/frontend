import React, { Component } from 'react';

export default class Logout extends Component{

    componentWillMount(){
        localStorage.removeItem('auth-token');
        this.props.history.push('/login?msg=User logged out!');
    }

    render (){
        return null
    }
}