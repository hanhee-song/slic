import React from 'react';

class MessageIndexContainer extends React.Component {
  render () {
    return (
      <div className="message-index-item">
        <div className="message-index-item-profile-image profile-image">
        </div>
        
        <div className="message-index-item-content">
          <div className="message-index-item-header">
            <div className="message-index-item-name">
              {this.props.message.author.username}
            </div>
            <div className="message-index-item-time">
              {this.props.message.created_at}
            </div>
          </div>
          
          <div className="message-index-item-body">
            {this.props.message.body}
          </div>
        </div>
      </div>
    );
  }
}

export default MessageIndexContainer;
