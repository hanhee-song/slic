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
          type="text"
          value={this.state.email}
          onChange={this.handleChange("email")} />
      );
    }
    return (
      <form
        onSubmit={this.handleSubmit}>
        
        {email}
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleChange("username")} />
        <input
          type="password"
          value={this.state.password}
          onChange={this.handleChange("password")} />
        <input
          type="submit"
          value="submit" />
      </form>
    );
  }
}

export default SessionForm;
