import React from 'react';
import { Link } from 'react-router-dom';

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { email: props.email };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.receiveEmail(this.state.email);
    this.props.history.push('/signup');
  }
  
  handleChange(e) {
    this.setState({ email: e.target.value });
  }
  
  render () {
    return (
      <div className="main">
        <div className="main-left">
          <img src="" alt="" />
        </div>
        
        <div className="main-right">
          <div>
            <div className="main-header">
              Where It Happens
            </div>
            <div className="main-body">
              When your team needs to kick off a project, hire a new employee, deploy some code, review a sales contract, finalize next year's budget, measure an A/B test, plan your next office opening, and more, Slic has you covered.
            </div>
          </div>
        
          <form
            className="main-form"
            onSubmit={this.handleSubmit}>
            
            <input
              className="main-signup-input"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email Address"/>
            
            <input
              className="main-signup-button"
              type="submit"
              value="GET STARTED" />
          </form>
          
          <div className="welcome-alternate">
            Already have an account? <Link to="/login">Log In</Link> or <Link to="/guest-login">Guest Login</Link>
          </div>
          
        </div>
        
      </div>
    );
  }
}

export default WelcomePage;
