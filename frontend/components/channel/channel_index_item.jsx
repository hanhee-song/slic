import React from 'react';

class ChannelIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div>{this.props.channel.name}</div>
    );
  }
}

export default ChannelIndexItem;
