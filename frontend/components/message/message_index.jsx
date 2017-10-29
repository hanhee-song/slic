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
        <div className="message-index-overflow-wrapper">
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
