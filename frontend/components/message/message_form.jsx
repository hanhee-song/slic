import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ body: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.createMessage(this.state);
    this.setState({ body: "" });
  }
  
  render () {
    return (
      <form
        onSubmit={this.handleSubmit}>
        
        <input
          type="text"
          onChange={this.handleChange}
          placeholder={`${this.props.channel.name}`}
          autoFocus/>
      </form>
    );
  }
}

export default MessageForm;
