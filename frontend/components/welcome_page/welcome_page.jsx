import React from 'react';

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
  
  componentWillReceiveProps(nextProps) {
    // if (nextProps.email) {
    //   this.props.history.push('/get-started');
    // }
  }
  
  handleChange(e) {
    this.setState({ email: e.target.value });
  }
  
  render () {
    return (
      <div className="main">
        <div className="main-left">
          <img src="#" alt="" />
        </div>
        
        <div className="main-right">
          <div>
            <div className="main-header">
              Where It Happens
            </div>
            <div className="main-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
              value="Get Started" />
          </form>
          
          <div className="main-signin">
            
          </div>
        </div>
        
      </div>
    );
  }
}

export default WelcomePage;
