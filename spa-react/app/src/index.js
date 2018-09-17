import React from 'react';
import ReactDOM from 'react-dom';
import StepBox from './Step';
import Home from './Home';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//import $ from 'jquery';
//import Popper from 'popper.js';
import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Logout from './Logout';

function verifyToken(){
    if(localStorage.getItem('auth-token')===null)
        return false
    return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        verifyToken() ? 
        <Component {...props}/> :
        <Redirect to="/login?msg=Você precisa estar logado para acessar a Timeline!"/>
    )}/>
);


ReactDOM.render(
   
    <Router>
        <Switch>            
            <Route  path="/login" component={Login}/>  
            <Route  path="/logout" component={Logout}/>  
            <PrivateRoute exact path="/" component={Home} /> 
            <PrivateRoute exact path="/steps" component={StepBox} />    
        </Switch>            
    </Router>
    ,
    document.getElementById('root'));

registerServiceWorker();
