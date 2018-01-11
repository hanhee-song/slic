import React from 'react';
import moment from 'moment';

const MessageIndexBeginning = ({ channel, currentUser }) => {
  let message = "";
  
  let name;
  if (channel.is_dm) {
    name = channel.name;
  } else if (channel.is_private) {
    name = (<div>
        <i className="fa fa-lock" aria-hidden="true"></i>&nbsp;
        {channel.name}
      </div>);
  } else {
    name = `#${channel.name}`;
  }
  
  if (channel.creator && channel.creator.username) {
    const time = ` on ${moment(new Date(channel.created_at)).format("MMMM Do")}`;
    if (channel.creator.id === currentUser.id) {
      message += `You created this channel${time}.`;
    } else if (channel.creator.id) {
      message += `${channel.creator.username} created this channel${time}.`;
    }
  }
  
  if (channel.is_dm) {
    message += ` This is the start of your conversation with ${channel.name}`;
  } else if (channel.is_private) {
    message += ` This is the very beginning of the ${channel.name} private channel.`;
  } else {
    message += ` This is the very beginning of the #${channel.name} channel.`;
  }
  
  if (channel.description) {
    message += ` Purpose: ${channel.description}`;
  }
  
  return (
    <div
      key={channel.id}
      className="message-index-item-beginning">
      <div className="message-index-item-beginning-header">
        {name}
      </div>
      <div className="message-index-item-beginning-body">
        {message}
      </div>
    </div>
  );
};

export default MessageIndexBeginning;
