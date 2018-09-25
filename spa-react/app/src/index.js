import React from 'react';
import ReactDOM from 'react-dom';
import StepBox from './Step';
import Home from './Home';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Logout from './Logout';
import PrivateRoute from './components/PrivateRoute';

 
ReactDOM.render(

    <Router>
        <Switch>            
            <Route  path="/login" component={Login}/>  
            <Route  path="/logout" component={Logout}/>  
            <PrivateRoute exact path="/" component={Home}  /> 
            <PrivateRoute exact path="/steps" component={StepBox} />    
        </Switch>            
    </Router>
    ,
    document.getElementById('root'));

registerServiceWorker();