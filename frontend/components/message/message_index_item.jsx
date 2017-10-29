import React from 'react';

class MessageIndexContainer extends React.Component {
  render () {
    return (
      <div className="message-index-item">
        <div className="message-index-item profile-image">
        </div>
        
        <div className="message-index-item-main">
          
        </div>
        {this.props.message.body}
        {this.props.message.author.username}
      </div>
    );
  }
}

export default MessageIndexContainer;
