import React from 'react';
import MessageIndexItemContainer from './message_index_item_container';
import MessageFormContainer from './message_form_container';
import MessageIndexBeginning from './message_index_beginning';
import { Route } from 'react-router-dom';

class MessageIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  
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
  
  render () {
    const messages = this.props.messages.map((message) => {
      return (
        <MessageIndexItemContainer
          key={message.id}
          message={message}/>
      );
    });
    
    // let messages = [];
    // for (var i = 0; i < messages.length; i++) {
    //   let message = messages[i];
    //   let nextMessage = message[i + 1];
    //   messages.push(
    //     <MessageIndexItemContainer
    //       key={message.id}
    //       message={message}/>
    //   );
    //
    // }
    
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
