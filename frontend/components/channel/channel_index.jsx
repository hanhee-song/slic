import React from 'react';
import ChannelIndexItemContainer from './channel_index_item_container';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchChannels();
  }
  
  handleClose() {
    this.props.clearDropdown();
  }
  
  render () {
    const channels = this.props.channels.map((channel) => {
      return (
        <ChannelIndexItemContainer
          key={channel.id}
          channel={channel} />
        );
    });
    return (
      <div
        onClick={this.handleClose}>
        this is a channel index
        {channels}
      </div>
    );
  }
}

export default ChannelIndex;
