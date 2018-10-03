import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

export default class PrivateRoute extends Component {

     verifytoken(){
        const authToken = localStorage.getItem('auth-token');
        if(authToken===null)
            return false;
            
        //validate token
        const requestInfo = {
            method: "GET",
            headers: new Headers({
                "Authorization":`Bearer ${authToken}`
            })
        };

        fetch('http://localhost:2000/verifytoken',requestInfo)
        .then(response=>{
            if(response.status !== 200)
                throw new Error("Invalid Token!")
        })
        .catch(error=>{
            console.log(error);
            localStorage.removeItem('auth-token');
            window.location.reload();
        });  

        return true;
    }

    render(){
        if(this.verifytoken())
        {
            return (
                <Route path={this.props.path} component={this.props.component} /> 
            );
        }
        else
        {
            return (
                <Redirect to="/login?msg=Você precisa estar logado para acessar o sistema!"/>
            );
        }

    }
}
 