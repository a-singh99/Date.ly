
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Register extends Component {
    constructor() {
        super();
        this.state = { firstname: null, lastname: null, username: null, password: null };
        this.formSubmit = this.formSubmit.bind(this);
        this.txtFieldChange = this.txtFieldChange.bind(this);
    }

    formSubmit(e) {
        e.preventDefault();
        axios
            .post('/encrypt', this.state)
            .then((res) => {
                console.log(res);
                location.href = "/login";
            })

    }

    txtFieldChange(e) {
        if (e.target.name === "firstname") {
            this.state.firstname = e.target.value;
        }
        else if (e.target.name === "lastname") {
            this.state.lastname = e.target.value;
        }
        else if (e.target.name === "username") {
            this.state.username = e.target.value;
        }
        else if (e.target.name === "password") {
            this.state.password = e.target.value;
        }
        this.setState({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password
        });
    }

    render() {
        return (
            <div className="heroSignup">
                <div id="authSignup">
                    <h3>Registration Form</h3>
                    <form onSubmit={this.formSubmit}>
                        <div className="form-group">
                            <input
                                onChange={this.txtFieldChange}
                                className="form-control"
                                required="required"
                                type="text"
                                placeholder="First Name"
                                name="firstname" />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.txtFieldChange}
                                className="form-control"
                                required="required"
                                type="text"
                                placeholder="Last Name"
                                name="lastname" />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.txtFieldChange}
                                className="form-control"
                                required="required"
                                type="text"
                                placeholder="Username"
                                name="username" />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.txtFieldChange}
                                className="form-control"
                                required="required"
                                type="password"
                                placeholder="Password"
                                name="password" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <div className="sub-text-box">
                            <small id="subtle-text">Already on Date.ly? <a className="signup-link" href="/login">Log In</a></small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;