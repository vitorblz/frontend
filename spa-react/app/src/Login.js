import React, { Component } from 'react';
import './css/signin.css';
import queryString from 'query-string'

export default class Login extends Component{

    constructor(props){
        super(props);
        const values = queryString.parse(this.props.location.search)
        this.state = {msg: values.msg};
    }

    send(event){
        event.preventDefault();

        const requestInfo = {
            method: "POST",
            body: JSON.stringify({username:this.login.value,password:this.password.value}),
            headers: new Headers({
                "Content-Type":"application/json"
            })

        };
    
        fetch('http://localhost:2000/api/login/',requestInfo)
            .then(response=>{
                if(response.ok){
                    return response.text();
                }
                else{
                    throw new Error("Can not authenticate!")
                }
            }).then(token=>{
                localStorage.setItem('auth-token',token);
                this.props.history.push('/');
            }).catch(error=>{
                this.setState({msg: error.message});
            });
    }

    render (){
        return(
            <div className="login">     
                <form className="form-signin" onSubmit={this.send.bind(this)}>
                    <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="login" className="sr-only">Login</label>
                    <input ref={(input)=> this.login = input} type="text" id="login" className="form-control" placeholder="Login" required autoFocus />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input ref={(input)=> this.password = input} type="password" id="password" className="form-control" placeholder="Password" required />

                    <span>{this.state.msg}</span>

                    <div className="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                </form>
            </div>
    );
  }
}