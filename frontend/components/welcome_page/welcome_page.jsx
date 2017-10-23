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
    this.props.history.push('/get-started');
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
      <div>
        Welcome Page Form
        <form
          onSubmit={this.handleSubmit}>
          
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email Address"/>
          
          <input
            type="submit"
            value="Get Started" />
        </form>
      </div>
    );
  }
}

export default WelcomePage;
