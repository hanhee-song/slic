import React from 'react';

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.date = this.date.bind(this);
  }
  
  date() {
    // some convoluted logic to show the right time. I'm sure I could do better
    let time = this.props.message.created_at
      .split("T")[1].split(":");
    let minute = time[1];
    const offset = new Date().getTimezoneOffset() / 60;
    let hour = parseInt(time[0]) - (offset);
    hour = hour <= 0 ? hour + 24 : hour;
    const suffix = hour >= 12 && hour !== 24 ? "PM" : "AM";
    hour = hour > 12 ? hour - 12 : hour;
    return `${hour}:${minute} ${suffix}`;
  }
  
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
