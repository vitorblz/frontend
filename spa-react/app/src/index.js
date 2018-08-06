import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StepBox from './Step';
import Home from './Home';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';


ReactDOM.render(
   
    <Router>
        <App>
            <Switch>            
                <Route exact path="/" component={Home}/>     
                <Route path="/steps" component={StepBox}/>           
            </Switch>            
        </App>
    </Router>
    ,

    document.getElementById('root'));

