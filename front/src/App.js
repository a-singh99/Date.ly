import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// import Link from 'react-router';

class App extends Component {
  constructor() {
    super();
    this.state = {}
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    localStorage.results = this.refs.searchItem.value
    this.refs.searchItem.value = '';
    location.href = "/result";
  }



  render() {
    console.log('what', this.props.data)
    if (this.props.auth) {
      return (
        <div className="hero">
          <div className="formContain">
            <h2 className="appTagLine">Welcome {this.props.data}</h2>
            <h1 className="appTitle">Need a date idea? Enter your location to get started.</h1>
            <form onSubmit={this.handleSearch}>
              <input type="text" ref="searchItem" placeholder="Enter your location. (Ex. Toronto, 123 Front Street, L1L 1L1)" />
              <span>
                <button type="submit" ><i className="material-icons">search</i></button>
              </span>
            </form>
          </div>
        </div>
      )
    }
    else {
      return ( 
        <div className="hero">
          <div className="formContain">
            <h1 className="appTitle">Need a date idea? Enter your location to get started.</h1>
            <form onSubmit={this.handleSearch}>
              <input type="text" ref="searchItem" placeholder="Enter your location. (Ex. Toronto, 123 Front Street, L1L 1L1)"/>
              <span>
                <button type="submit"><i className="material-icons">search</i></button>
              </span>
            </form>
          </div>
        </div>
      )
    }


    /*if (this.state.auth) {
      return (
        <div className="hero">
          <h1>QuikDate mon</h1>
           <h2>Welcome {this.state.data}</h2>
           <form>
          <input type="text" ref="searchItem" />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit" onClick={this.handleSearch}>+</button>
          </span>
          </form>

        </div>
      )
    }
    else {
      return (
        <div className="hero">
          <h1>QuikDate mon</h1>
          <input type="text" ref="searchItem" />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit" onClick={this.handleSearch}>+</button>
          </span>

        </div>
      )
    }*/

  }
}



export default App;
