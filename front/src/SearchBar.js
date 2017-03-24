import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class SearchBar extends Component {
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
        return (
            <div>
                <form onSubmit={this.handleSearch}>
                    <input type="text" ref="searchItem" placeholder="Enter another location." />
                    <span>
                        <button type="submit" className="searchBtn"><i className="material-icons">search</i></button>
                    </span>
                </form>
            </div>
        )
    }
}
export default SearchBar;