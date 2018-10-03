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
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {steps} from './reducers/steps'; 
import {message} from './reducers/message'; 
import {Provider} from 'react-redux';

const reducers = combineReducers({message,steps});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

 
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>            
                <Route  path="/login" component={Login}/>  
                <Route  path="/logout" component={Logout}/>  
                <PrivateRoute exact path="/" component={Home}  /> 
                <PrivateRoute exact path="/steps" component={StepBox} />    
            </Switch>            
        </Router>
    </Provider>
    ,
    document.getElementById('root'));

registerServiceWorker();