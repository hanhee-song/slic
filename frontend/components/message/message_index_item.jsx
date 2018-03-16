import React from 'react';
import moment from 'moment';

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.date = this.date.bind(this);
  }
  
  date() {
    const time = new Date(this.props.messageGroup[0].created_at);
    return moment(time).format("h:mm a");
  }
  
  render () {
    const messageGroup = this.props.messageGroup.map((message) => {
      return (
        <div className="message-index-item-body"
          key={message.id}>
          {message.body}
        </div>
      );
    });
    
    return (
      <div className="message-index-item">
        <div className="message-index-item-profile-image profile-image">
          <img className="profile-image"
              src={this.props.messageGroup[0].author.avatar_url} />
        </div>
        
        <div className="message-index-item-content">
          <div className="message-index-item-header">
            <div className="message-index-item-name">
              {this.props.messageGroup[0].author.username}
            </div>
            <div className="message-index-item-time">
              {this.date()}
            </div>
          </div>
          
          {messageGroup}
        </div>
      </div>
    );
  }
}

export default MessageIndexItem;
