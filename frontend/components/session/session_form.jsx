import React from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';

class SessionForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: props.email,
      username: "",
      password: "",
      submitTimeout: null,
      typeUsername: null,
      typePassword: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cleanUp = this.cleanUp.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType) {
      this.cleanUp();
      this.setState({
        username: "",
        password: "",
        email: "",
      });
    }
    
    // Guest Login
    if (nextProps.formType === "/guest-login") {
      this.generateGuest();
    }
  }
  
  componentDidMount() {
    // Guest Login
    if (this.props.formType === "/guest-login") {
      this.generateGuest();
    }
  }
  
  generateGuest() {
    const random = Math.floor(999999 * Math.random());
    const guest = {
      username: `Guest${random}`,
      password: 'asdfasdf',
    };
    const userOptions = {
      strings: [guest.username],
      typeSpeed: 40,
    };
    const passOptions = {
      strings: [guest.username],
      typeSpeed: 40,
    };
    let typed;
    this.setState({
      typeUsername: setTimeout(function () {
        typed = new Typed(".session-form .username", userOptions);
      }, 100),
      typePassword: setTimeout(function () {
        typed = new Typed(".session-form .password", passOptions);
      }, 1000),
      submitTimeout: setTimeout(() => {
        this.props.submitForm(guest);
      }, 2000)
    });
  }
  
  componentWillUnmount() {
    this.cleanUp();
  }
  
  cleanUp() {
    this.props.removeSessionErrors();
    clearTimeout(this.state.submitTimeout);
    clearTimeout(this.state.typePassword);
    clearTimeout(this.state.typeUsername);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.removeSessionErrors();
    const user = Object.assign({}, this.state);
    this.props.submitForm(user);
  }
  
  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }
  
  render () {
    const signup = this.props.formType === "/signup";
    
    const header = signup ?
      "Create an Account" : "Sign in to Slic";
    
    
    const button = signup ?
      "Get started" : "Sign in";
    
    const errors = this.props.errors.map((error, idx) => (
      <li
        className="session-error"
        key={idx}>
        {error}
      </li>
    ));
    
    const alternateSession = (
      signup ?
      <div className="session-alternate">
        Already have an account? <Link to="/login">Log In</Link> or <Link to="/guest-login">Guest Login</Link>
      </div> :
      <div className="session-alternate">
        Don't have an account yet? <Link to="/signup">Sign Up</Link> or <Link to="/guest-login">Guest Login</Link>
      </div>
    );
    
    let email;
    if (signup) {
      email = (
        <input
          className="session-input"
          type="text"
          value={this.state.email}
          onChange={this.handleChange("email")}
          placeholder="Email Address"/>
      );
    }
    
    return (
      <div className="session-container">
        <div className="session-box">
          <form
            className="session-form"
            onSubmit={this.handleSubmit}>
            
            <div className="session-form-header">
              {header}
            </div>
            
            {errors.length > 0 ?
              <ul className="session-errors">{errors}</ul> : null}
            
            <div className="session-form-subheader">
              Enter your <strong>username</strong> and <strong>password</strong>
            </div>
              
            <input
              className="session-input username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange("username")}
              placeholder="Username"
              autoFocus
              key={this.props.formType}
              />
            {email}
            <input
              className="session-input password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange("password")}
              placeholder="Password"/>
                            
            <input
              className="session-button"
              type="submit"
              value={button} />
            
          </form>
          {alternateSession}
        </div>
      </div>
    );
  }
}

export default SessionForm;
