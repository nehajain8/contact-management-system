import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ContactForm from './components/ContactComponent.js'
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      showbtn: false,
      direction: false,
      searchvalue: ''
    };
    this.onSort = this.onSort.bind(this)
    this.updateSearch= this.updateSearch.bind(this)
  }
  show = (e) => {
    e.preventDefault();
    axios.get('/api/contact')
    .then(res => {
      this.setState({ contacts: res.data });
      this.setState({showbtn: true});
      console.log(this.state.contacts);

    })
    .catch((error) => {
      if(error.response.status === 401) {
        this.props.history.push("/login");
      }
    });
  }
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    this.props.history.push("/login")
    window.location.reload();

  }

  onSort(event, sortKey){
    const contacts = this.state.contacts;
    var direction = this.state.direction;
    this.setState({direction: !direction})
    console.log(direction);
    this.state.direction ?
    contacts.sort((a,b) => a[sortKey].localeCompare(b[sortKey])) 
    : contacts.sort((a,b) => b[sortKey].localeCompare(a[sortKey])) 
    this.setState({contacts})    
  }

  updateSearch(e){
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  } 

  render() {

    let filteredcontacts= this.state.contacts.filter(
      (contact) => {
        return contact.name.toLowerCase().indexOf(
          this.state.searchvalue) !== -1;
        }
    );
   
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
           <h3 class="panel-title">
              Contact List &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
           </h3>
          <ContactForm></ContactForm>
          </div>

          <div class="search-wrapper">
          <label for="search" class="search-label">Search</label>
          <input type="text" class="form-control" placeholder="type name to search" name="searchvalue" value={this.state.searchvalue} onChange={this.updateSearch}/>
          </div>

          <button class="btn btn-lg btn-primary btn-block show-contact" type="submit" onClick={this.show}>Show Contact</button>
         { this.state.showbtn ?
           <div class="panel-body">
            <table class="table table-stripe contact-list-table">
              <thead>
                <tr>
                  <th onClick={e => this.onSort(e, 'name')}>Name</th>
                  <th onClick={e => this.onSort(e, 'email')}>Email</th>
                  <th>phonenumber</th>
                  <th>group</th>
                </tr>
              </thead>
              <tbody>
                {filteredcontacts.map(contact =>
                  <tr>
                    <td><Link to={`/show/${contact._id}`}>{contact.name}</Link></td>
                    <td>{contact.email}</td>
                    <td>{contact.phonenumber}</td>
                    <td>{contact.group}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          : null
          }
          
        </div>
      </div>
    );
  }
}

export default App;
