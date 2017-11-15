import React from 'react';
import MessageIndexItemContainer from './message_index_item_container';
import MessageFormContainer from './message_form_container';
import MessageIndexBeginning from './message_index_beginning';

class MessageIndex extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.channelId !== nextProps.match.params.channelId) {
      this.props.fetchMessages(nextProps.match.params.channelId);
      pusher.unsubscribe(`channel-connection-${this.props.match.params.channelId}`);
      
      var channel = pusher.subscribe(`channel-connection-${nextProps.match.params.channelId}`);
      channel.bind('create-message', (message) => {
        this.props.receiveMessage(message);
      });
      
      const element = document.querySelector(".message-index-overflow-wrapper");
      element.scrollTop = 0;
    }
  }
  
  componentDidMount() {
    this.props.fetchMessages(this.props.match.params.channelId);
    var channel = pusher.subscribe(`channel-connection-${this.props.match.params.channelId}`);
    channel.bind('create-message', (message) => {
      this.props.receiveMessage(message);
    });
    
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
    pusher.unsubscribe(`channel-connection-${this.props.match.params.channelId}`);
  }
  
  generateDate(date) {
    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    let time;
    if (today.getMonth() === date.getMonth()
      && today.getDate() === date.getDate()
      && today.getYear() === date.getYear()) {
      time = "Today";
    } else if (yesterday.getMonth() === date.getMonth()
      && yesterday.getDate() === date.getDate()
      && yesterday.getYear() === date.getYear()) {
      time = "Yesterday";
    } else {
      const thisMonth = "January February March April May June July August September October November December".split(' ')[today.getMonth()];
      const thisDay = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(' ')[today.getDay()];
      time = `${thisDay}, ${thisMonth} ${date.getDate()}`;
    }
    return time;
  }
  
  render () {
    let messages = [];
    for (var i = 0; i < this.props.messages.length; i++) {
      let message = this.props.messages[i];
      let prevMessage = this.props.messages[i - 1] || {};
      let thisDate = new Date(message.created_at);
      let nextDate = new Date(prevMessage.created_at) || {};
      if (thisDate.getDate() !== nextDate.getDate()
        || thisDate.getMonth() !== nextDate.getMonth()
        || thisDate.getYear() !== nextDate.getYear()) {
        
        let date = this.generateDate(thisDate);
        
        messages.push(
          <div
            className="message-index-divider"
            key={-message.id}>
            <div className="message-index-divider-line">
              
              <div className="message-index-divider-text">
                {date}
              </div>
            </div>
          </div>
        );
      }
      
      messages.push(
        <MessageIndexItemContainer
          key={message.id}
          message={message}/>
      );

    }
    
    const channel = this.props.channel;
    
    return (
      <div className="message-container">
        <div className="message-index-overflow-wrapper custom-scroll">
          <div className="message-index">
            { channel.id &&
              <MessageIndexBeginning
                channel={channel}
                currentUser={this.props.currentUser} />
            }
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
