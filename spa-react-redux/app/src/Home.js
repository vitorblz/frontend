import React, { Component } from 'react';
import Menu from './Menu';
import './css/index.css';

export default class Home extends Component{

  render (){
    return(
      <div>
        <Menu />
        <main role="main" className="container">
          <div>
              <div className="row">
                  <h1>Welcome!</h1>
              </div>
              <div className="row">

              </div>
          </div> 
        </main>
      </div>
    );
  }
}