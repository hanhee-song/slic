import React from 'react';
import moment from 'moment'

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.date = this.date.bind(this);
  }
  
  date() {
    const time = new Date(this.props.message.created_at);
    return moment(time).format("h:mm a");
  }
  
  render () {
    return (
      <div className="message-index-item">
        <div className="message-index-item-profile-image profile-image">
          <img className="profile-image"
              src={this.props.message.author.avatar_url} />
        </div>
        
        <div className="message-index-item-content">
          <div className="message-index-item-header">
            <div className="message-index-item-name">
              {this.props.message.author.username}
            </div>
            <div className="message-index-item-time">
              {this.date()}
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

export default MessageIndexItem;
