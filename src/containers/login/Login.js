import React from 'react';
import Auth from '../../utils/auth/Auth';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import '../../css/signin.css';

import {
  Redirect
} from "react-router-dom";

class Login extends React.Component {

  state = {
    username: undefined,
    password: undefined
  }

  login = () => {
    Auth.authenticate(this.state.username.trim(), this.state.password.trim(), () => { this.forceUpdate();; });
  };

  onChange = (e) => {
    e.preventDefault();
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.login();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    //const { username, password } = this.state;

    if (Auth.isAuthenticated()) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Header />
        <div className="text-center">
          <br />
          <div>
            <form className="form-signin" onSubmit={this.onSubmit} action="">
              <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="32" height="32" />
              <h1 className="h3 mb-3 font-weight-normal">Please login</h1>
              <label htmlFor="inputUsername" className="sr-only">Username</label>
              <input type="username" name="username" onChange={this.onChange} id="inputUsername" className="form-control" placeholder="Username" required autoFocus />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" name="password" onChange={this.onChange} id="inputPassword" className="form-control" placeholder="Password" required />
              <button className="btn btn-lg btn-primary btn-block" onSubmit={this.onSubmit}>Sign in</button>
            </form>

          </div>
          <hr />
          <Footer />
        </div>
      </div>

    );
  }
}

export default Login;