import React from 'react';

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { email: props.email };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.receiveEmail(this.state.email);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.email) {
      this.props.history.push('/');
    }
  }
  
  handleChange(e) {
    this.setState({ email: e.target.value });
  }
  
  render () {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}>
          
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange} />
          
          <input
            type="Submit"
            value="Get Started" />
        </form>
      </div>
    );
  }
}

export default WelcomePage;
