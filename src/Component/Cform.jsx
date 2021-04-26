import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

 import './Cform.css';

export default class PersonList extends React.Component {
  state = {
    fieldname: '',
  }

  handleChange = event => {
    this.setState({ fieldname: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
   alert("submit:)")
    const user = {
      fieldname: this.state.fieldname
    };
  console.log(user)
    axios.post('http://localhost:1000/create', user )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div class="maindiv">
        <form onSubmit={this.handleSubmit}>
        <p>
        <h2>Field Name Category</h2>
          <label>
           Fieldname (Italian,Indian,Chinese)::-
            <input type="text" name="fieldname" onChange={this.handleChange} />
          </label>
          </p>
          <button type="submit">Add</button>
        </form>
        <Link to="/dform">
     <button type="button">
         Add Dishes
     </button>
     </Link>
      </div>


    )
  }
}

        