import React from 'react';

const MessageIndexBeginning = ({ channel, currentUser }) => {
  debugger;
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
    const date = new Date(channel.created_at);
    const today = new Date();
    const thisMonth = "January February March April May June July August September October November December".split(' ')[today.getMonth()];
    const month = "January February March April May June July August September October November December".split(' ')[date.getMonth()];
    
    let time;
    if (thisMonth === month && today.getDate() === date.getDate()) {
      time = " today";
    } else {
      time = ` on ${month} ${date.getDate()}`;
    }
  
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
      <div className="message-index-item-break"></div>
    </div>
  );
};

export default MessageIndexBeginning;
