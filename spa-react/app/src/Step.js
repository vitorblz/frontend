import React, { Component } from 'react';
import CustomInput from './components/CustomInput.js';
import PubSub from 'pubsub-js';
import Menu from './Menu';
import './css/index.css';

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
      <tbody>
        {
          this.props.list.map(this.listRow)
        }
      </tbody>
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
    this.props.list.push({id: this.props.list.length+1, name:this.state.name, description: this.state.description});  
    this.setState({ id: '', name: '', description: '' });
    PubSub.publish('updateStepList',this.props.list);
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
    this.state = { 
      list: [
        {id: '1', name:'Alberto', description: 'alberto@gmail.com'}
      ] 
    };
    this.updateList = this.updateList.bind(this);
  }

  componentDidMount(){
      this.state.list.push({id: '2', name:'Vitor', description: 'vitorblz@gmail.com'});
      this.setState({list: this.state.list});
      PubSub.subscribe('updateStepList',function(topico,newList){
        this.setState({list: newList});
      }.bind(this));
  }

  updateList(newList){
    this.setState({'list': newList})
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
            <StepForm list={this.state.list} />
          </div>
          <div className="row">
            <StepTable list={this.state.list}/>
          </div>
        </main>
      </div>
    );
  }
}