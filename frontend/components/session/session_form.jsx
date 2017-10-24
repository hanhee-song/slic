import React from 'react';
// import { Route } from 'react-router-dom';

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
    if (nextProps.loggedIn) {
      this.props.history.push('/you-logged-in');
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.submitForm(user);
  }
  
  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }
  
  render () {
    let email;
    if (this.props.formType === "/signup") {
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
          className= "session-form"
          onSubmit={this.handleSubmit}>
          
          {email}
          <input
            className="session-input"
            type="text"
            value={this.state.username}
            onChange={this.handleChange("username")}
            placeholder="Username"/>
          <input
            className="session-input"
            type="password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            placeholder="Password"/>
          <input
            className="session-button"
            type="submit"
            value="GET STARTED" />
        </form>
        
      </div>
    );
  }
}

export default SessionForm;
