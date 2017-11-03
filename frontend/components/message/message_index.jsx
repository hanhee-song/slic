import React from 'react';
import MessageIndexItemContainer from './message_index_item_container';
import MessageFormContainer from './message_form_container';
import { Route } from 'react-router-dom';

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.channelId !== nextProps.match.params.channelId) {
      this.props.fetchChannel(nextProps.match.params.channelId);
    }
  }
  
  componentDidMount() {
    this.props.fetchChannel(this.props.match.params.channelId);
    var channel = pusher.subscribe('channel-connection');
    channel.bind('create-message', (message) => {
      this.props.fetchChannel(this.props.match.params.channelId);
    });
    
    // Credit to Felix Kling on S.O. for this solution
    document.querySelector('.message-index-overflow-wrapper')
      .addEventListener('wheel', (e) => this.flipWheel(e));
  }
  
  flipWheel(e) {
    if(e.deltaY) {
      e.preventDefault();
      e.currentTarget.scrollTop -= parseFloat(getComputedStyle(e.currentTarget)
        .getPropertyValue('font-size')) * (e.deltaY) / 15;
    }
  }
  
  componentWillUnmount() {
    document.querySelector('.message-index-overflow-wrapper')
      .removeEventListener("wheel", (e) => this.flipWheel(e));
  }
  
  render () {
    const messages = this.props.messages.map((message) => {
      return (
        <MessageIndexItemContainer
          key={message.id}
          message={message}/>
      );
    });
    
    let message = "";
    let beginningMessage;
    
    const channel = this.props.channel;
    if (channel.id) {
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
        if (thisMonth === month && today.getDay() === date.getDay()) {
          time = " today";
        } else {
          time = ` on ${month} ${date.getDate()}`;
        }
      
        if (channel.creator.id === this.props.currentUser.id) {
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
      
      beginningMessage = (
        <div
          key={channel.id}
          className="message-index-item beginning">
          <div className="message-index-item-beginning-header">
            {name}
          </div>
          <div className="message-index-item-beginning-body">
            {message}
          </div>
          <div className="message-index-item-break"></div>
        </div>
      );
    }
    
    return (
      <div className="message-container">
        <div className="message-index-overflow-wrapper custom-scroll">
          <div className="message-index">
            {beginningMessage}
            {messages}
          </div>
          
        </div>
        <MessageFormContainer
          channel={channel} />
      </div>
    );
  }
}

export default MessageIndex;
