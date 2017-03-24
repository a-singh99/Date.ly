import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Login extends Component {
    constructor() {
        super();
        this.state = { username: null, password: null, warning: 'no-warning' };
        this.formSubmit = this.formSubmit.bind(this);
        this.txtFieldChange = this.txtFieldChange.bind(this);
    }

    formSubmit(e) {
        let self = this;
        e.preventDefault();
        axios
            .post('/login', this.state)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.authToken = res.data.token;
                    // location.href = "http://localhost:3000/private";
                    location.href = "/";

                }
            })
            .catch(() => {
                self.setState({
                    warning: 'Invalid Login',
                })
                // location.href = "http://localhost:3000";
            })
    }

    txtFieldChange(e) {
        if (e.target.name === "username") { this.state.username = e.target.value }
        else if (e.target.name === "password") { this.state.password = e.target.value }

        this.setState({
            username: this.state.username,
            password: this.state.password
        });
    }

    render() {

        return (
            <div className="heroLogin">
                <div id="auth">
                    {console.log(this.state.warning)}
                    <h3>Login Form</h3>
                    <p className={"alert alert-danger " + this.state.warning}>Incorrect username or password</p>
                    <form onSubmit={this.formSubmit}>
                        <div className="form-group">
                            {/*<span><i className="material-icons prefix">account_circle</i></span>*/}
                            <input
                                onChange={this.txtFieldChange}
                                className="form-control"
                                type="text"
                                placeholder="Username"
                                name="username" />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.txtFieldChange}
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                name="password" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="sub-text-box">
                            <small className="subtle-text">New to Date.ly? <a className="signup-link" href="/signup">Sign up</a></small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;