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
      e.currentTarget.scrollTop -= parseFloat(getComputedStyle(e.currentTarget).getPropertyValue('font-size')) * (e.deltaY < 0 ? -1 : 1) * 2;
    }
  }
  
  componentWillUnmount() {
    document.querySelector('.message-index-overflow-wrapper')
      .removeEventListener("wheel", this.flipWheel);
  }
  
  render () {
    const messages = this.props.messages.map((message) => {
      return (
        <MessageIndexItemContainer
          key={message.id}
          message={message}/>
      );
    });
    
    return (
      <div className="message-container">
        <div className="message-index-overflow-wrapper custom-scroll">
          <div className="message-index">
            {messages}
          </div>
          
        </div>
        <MessageFormContainer
          channel={this.props.channel} />
      </div>
    );
  }
}

export default MessageIndex;
