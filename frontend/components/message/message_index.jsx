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
    
    let beginningMessage;
    if (this.props.channel.id) {
      beginningMessage = (
        <div
          key={this.props.channel.id}
          className="message-index-item beginning">
          <div className="message-index-item-beginning-header">
            { !this.props.channel.is_dm && "#" }
            {this.props.channel.name}
          </div>
          <div className="message-index-item-beginning-body">
            {
              this.props.channel.is_dm ?
              `This is the start of your conversation with ${this.props.channel.name}`
              :
              `This is the very beginning of the #${this.props.channel.name} channel.`
            }
            
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
          channel={this.props.channel} />
      </div>
    );
  }
}

export default MessageIndex;
