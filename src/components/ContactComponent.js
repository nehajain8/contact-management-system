import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class ContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phonenumber: '',
      group: ''
    };
    this.onChangeCheckbox= this.onChangeCheckbox.bind(this)
  }
  // getInitialState() {
  //   return {
  //     groupstatus: 'option1'
  //   };
  // }

  //handle checkbox change event
  onChangeCheckbox(event){
    var newState=this.state.group;
    this.setState(newState)
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phonenumber, group } = this.state;
    console.log(typeof group);
    axios.post('/api/contact', { name, email, phonenumber, group })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { name, email, phonenumber, group } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          <h2 class="form-signin-heading">Add Contact</h2>
          <label for="inputName" class="contact-label">Name</label>
          <input type="text" class="form-control" placeholder="contact name" name="name" value={name} onChange={this.onChange} required/>

          <label for="inputEmail" class="contact-label">Email</label>
          <input type="email" class="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>
          
          <label for="inputnumber" class="contact-label">phonenumber</label>
          <input type="number" class="form-control" placeholder="Contact number" name="phonenumber" value={phonenumber} onChange={this.onChange} required/>
          
          <label for="groupstatus" class="contact-label">Active/Inactive</label>
          <input type="text" class="form-control" placeholder="contact group" name="group" value={group} onChange={this.onChange} required/>
          
          {this.state.group}
          <button class="btn btn-lg btn-primary btn-block add-contact" type="submit">Add Contact</button>

        </form>
      </div>
    );
  }
}

export default ContactForm;
