import React from 'react';
import moment from 'moment';

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
        
        {
          this.props.isGroupHead ?
          <div className="message-index-item-left-image">
            <img className="profile-image"
              src={this.props.message.author.avatar_url} />
          </div>
          :
          <div className="message-index-item-left-timestamp">
            {this.date()}
          </div>
        }
        
        <div className="message-index-item-content">
          {
            this.props.isGroupHead &&
            <div className="message-index-item-header">
              <div className="message-index-item-name">
                {this.props.message.author.username}
              </div>
              <div className="message-index-item-time">
                {this.date()}
              </div>
            </div>
          }
          
          <div className="message-index-item-body">
            {this.props.message.body}
          </div>
        </div>
      </div>
    );
  }
}

export default MessageIndexItem;
