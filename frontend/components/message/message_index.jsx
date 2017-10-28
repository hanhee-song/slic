import React from 'react';
import MessageIndexItemContainer from './message_index_item_container';
import MessageFormContainer from './message_form_container';
import { Route } from 'react-router-dom';

class MessageIndexContainer extends React.Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  
  render () {
    
    
    return (
      <div>
        this is a message index
        <MessageIndexItemContainer />
        <MessageFormContainer
          channel={this.props.channel} />
      </div>
    );
  }
}

export default MessageIndexContainer;
