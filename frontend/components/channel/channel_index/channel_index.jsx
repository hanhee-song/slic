import React from 'react';
import ChannelIndexItemContainer from './channel_index_item_container';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose() {
    this.props.clearDropdown();
  }
  
  componentWillUnmount(nextProps, nextState) {
    this.props.fetchChannels({ visible: true });
  }
  
  render () {
    const channels = this.props.channels.reverse().map((channel) => {
      return (
        <ChannelIndexItemContainer
          key={channel.id}
          channel={channel} />
        );
    });
    return (
      <div className="fullscreen-container">
        <div className="fullscreen-inside">
          <div
            className="fullscreen-x"
            onClick={this.handleClose}>
            <i className="fa fa-times" aria-hidden="true"></i>
            <div className="fullscreen-esc">esc</div>
          </div>
          <div className="fullscreen-header">
            Browse Channels
          </div>
          <div className="fullscreen-subheader">
            Channels you can join
          </div>
          <div className="channel-index-list-container">
            <ul className="channel-index-list">
              {channels}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
