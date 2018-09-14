import React from 'react';
import ReactDOM from 'react-dom';
import StepBox from './Step';
import Home from './Home';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//import $ from 'jquery';
//import Popper from 'popper.js';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
   
    <Router>
        <Switch>            
            <Route  path="/login" component={Login}/>  
            <Route exact path="/" component={Home}/>     
            <Route path="/steps" component={StepBox}/>           
        </Switch>            
    </Router>
    ,
    document.getElementById('root'));

registerServiceWorker();
