import React from 'react';
import { Link } from 'react-router-dom';


class SessionForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: props.email,
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType) {
      this.props.removeSessionErrors();
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
    this.setState({
      username: `Guest${random}`,
      password: 'asdfasdf'
    });
  }
  
  componentWillUnmount() {
    this.props.removeSessionErrors();
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
      "Create an Account" : "Welcome back";
    
    
    const button = signup ?
      "GET STARTED" : "SIGN IN";
    
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
        <form
          className="session-form"
          onSubmit={this.handleSubmit}>
          
          <div className="session-form-header">
            {header}
          </div>
          
          
          {errors.length > 0 ?
            <ul className="session-errors">{errors}</ul> : null}

          <input
            className="session-input"
            type="text"
            value={this.state.username}
            onChange={this.handleChange("username")}
            placeholder="Username"
            autoFocus
            key={this.props.formType}
            />
          {email}
          <input
            className="session-input"
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
    );
  }
}

export default SessionForm;