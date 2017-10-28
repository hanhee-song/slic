import React from 'react';
import MessageIndexItemContainer from './message_index_item_container';

class MessageIndexContainer extends React.Component {
  render () {
    return (
      <div>
        this is a message index
        <MessageIndexItemContainer />
      </div>
    );
  }
}

export default MessageIndexContainer;
