import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }
  
  handleChange(e) {
    this.setState({ body: e.target.value });
  }
  
  handleJoin() {
    this.props.rememberCurrentChannelId(
      this.props.currentUser, this.props.channel.id);
    this.props.makeChannelVisible(this.props.channel);
    this.closeModal();
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.createMessage(this.state);
    this.setState({ body: "" });
  }
  
  render () {
    let placeholder = "Message ";
    placeholder += "#"; // put logic for messages later
    placeholder += this.props.channel.name;
    
    const input = this.props.channel.visible ?
      (
        <div className="message-form-input-wrapper">
          <input
            className="message-form-input"
            type="text"
            onChange={this.handleChange}
            placeholder={placeholder}
            autoFocus
            value={this.state.body}
            key={this.props.channel.id}/>
          <div className="message-form-plus">
            
          </div>
        </div>
      ) : (
        <div className="message-form-join-wrapper">
          <div
            className="message-form-join-button"
            onClick={this.handleJoin}>
            Join Channel
          </div>
        </div>
      );
    
    return (
      <div className="message-form">
        <form
          className="message-form-form"
          onSubmit={this.handleSubmit}>
          
          {input}
        </form>
      </div>
    );
  }
}

export default MessageForm;
