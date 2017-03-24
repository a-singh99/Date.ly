import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Result from './ResultPage';
import Register from './RegisterPage';
import Login from './LoginPage';
import Private from './PrivatePage';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import './index.css';
import axios from 'axios';

class Header extends React.Component {

  constructor() {
    super();
    this.state = { data: null, loading: true, auth: false }
    this.handleSignout = this.handleSignout.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
  }


  componentWillMount() {
    console.log(localStorage.authToken);

    const self = this;
    //token check
    if (localStorage.authToken !== undefined && localStorage.authToken !== null) {
      axios
        .get('/privatedata', { headers: { 'authorization': localStorage.authToken } })
        .then((res) => {
          console.log('here', res.data);
          //token is valid show page and data
          if (res.status === 200) {
            self.setState({
              loading: false,
              auth: true,
              data: res.data
            });
          }
        }).catch((err) => {
          //send user back to login page if token is invalid
          location.href = '/';
        })
    }
    else {
      // location.href = 'http://localhost:3000';
      console.log('index stop')
    }
  }

  handleSignout() {
    console.log(localStorage);
    localStorage.clear();
    location.href = '/';
  }

  handleAccount() {
    location.href = "/private";
  }

  render() {
    if (!this.state.auth) {
      return (
        <div className="">
          <div className="header">
            <button className="appBtn"><Link to="/">
              {/*<img src="/assets/logo.png" alt="Logo" />*/}
              <p className="appText">Date.ly</p>
            </Link></button>
            {/*<button><Link to="/result">Results</Link></button>*/}
            <button className="headerSignup headerBtn"><Link to="/signup">Sign up</Link></button>
            <button className="headerLogin headerBtn"><Link to="/login">Login</Link></button>
          </div>

          <div className="">
            {React.cloneElement(this.props.children, { auth: this.state.auth })}
            {/*{this.props.children}*/}
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="header">
            <button className="appBtn"><Link to="/">
              {/*<img src="/assets/logo.png" alt="Logo" />*/}
              <p className="appText">Date.ly</p>
            </Link></button>
            {/*<button><Link to="/result">Results</Link></button>
            <button><Link to="/signup">Sign up</Link></button>
            <button><Link to="/login">Login</Link></button>*/}
            <button className="headerSignout headerBtn" onClick={this.handleSignout}> Signout </button>
            <button className="headerAccount headerBtn" onClick={this.handleAccount}>{this.state.data}</button>
          </div>

          {React.cloneElement(this.props.children, { auth: this.state.auth, data: this.state.data })}
          {/*{this.props.children}*/}
        </div>
      )
    }
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Header}>
      <IndexRoute component={App} />
      <Route path='/result' component={Result} />
      <Route path='/signup' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/private' component={Private} />
    </Route>
  </Router>
), document.getElementById('root'));









/*


----------------------------------------------------------------
Extra
- Results from api: get more diverse with the actitives? rating>4 ?
- shuffle button flips the cards??
- loading bar
- login page : display invalid and doesnt shut down server
- date for private page
- AWS
*/