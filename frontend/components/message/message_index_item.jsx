import React from 'react';

class MessageIndexContainer extends React.Component {
  render () {
    return (
      <div>
        {this.props.message.body}
      </div>
    );
  }
}

export default MessageIndexContainer;
