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
    this.props.subscribeUserIdsToChannel(
      this.props.channel,
      [this.props.currentUser.id]
    );
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.body) {
      this.props.createMessage(this.state);
      this.setState({ body: "" });
    }
  }
  
  render () {
    const channel = this.props.channel;
    let placeholder = "Message ";
    if (!channel.is_dm && !channel.is_private) {
      placeholder += "#";
    }
    placeholder += channel.name;
    
    const input = channel.subscribed ?
      (
        <div className="message-form-input-wrapper">
          <input
            className="message-form-input"
            type="text"
            onChange={this.handleChange}
            placeholder={placeholder}
            autoFocus
            value={this.state.body}
            key={channel.id}/>
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
