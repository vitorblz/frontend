import React, { Component } from 'react';
import CustomInput from './components/CustomInput.js';
import Menu from './Menu';
import './css/index.css';
import StepStore from './stores/StepStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class StepTable extends Component {

  listRow = row=> (
    <tr key={"row-"+row.id} id={"row-"+row.id}>
      <td>{row.name}</td>
      <td>{row.description}</td>
    </tr>
  )


  render() {
    return (
      <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <ReactCSSTransitionGroup 
          component="tbody"
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {
          this.props.list.map(this.listRow)
        }
        </ReactCSSTransitionGroup>
      </table>
    );
  }
}

export class StepForm extends Component {

  constructor(){
    super();
    this.sendForm = this.sendForm.bind(this);
    this.state = { id: '', name: '', description: '' };
  }

  sendForm(event){
    event.preventDefault();
    //this.props.list.push({id: this.props.list.length+1, name:this.state.name, description: this.state.description});  
    this.setState({ id: '', name: '', description: '' });
    this.props.store.saveStep(this.state.name, this.state.description);
  }

  render() {
    return (
      <form onSubmit={this.sendForm} method="post">
      <CustomInput type="text" className="form-control" id="name" name="name" label="Name"
            value={this.state.name} onChange={this.setField.bind(this,'name')} aria-describedby="Name" placeholder="" />
      <CustomInput type="text" className="form-control" id="description" name="description" label="Description"
            value={this.state.description} onChange={this.setField.bind(this,'description')} aria-describedby="Description" placeholder="" />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    );
  }

  setField(name, event){
    this.setState({[name] : event.target.value})
  }
}

export default class StepBox extends Component{

  constructor(){
    super();
    this.state = { list: [], msg: '' };
    this.store  = new StepStore([]);
  }


  componentWillMount(){
    this.store.subscribe(function(topico,state){ 
      this.setState(state);
    }.bind(this));

    this.store.getSteps();
  }

  componentWillUnmount(){
    this.store.cancelSubscription();
  }

  render (){
    return(
      <div>
        <Menu />
        <main role="main" className="container">
          <div className="row">
              <h1>Create Step</h1>
          </div>
          <div className="row form-cadastro">
            <StepForm list={this.state.list} store={this.store} />
          </div>
          <div className="row msg" role="alert">{this.state.msg}</div>
          <div className="row">
            <StepTable list={this.state.list} store={this.store}/>
          </div>
        </main>
      </div>
    );
  }
}