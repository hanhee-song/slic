import React from 'react';
import ChannelIndexItem from './channel_index_item';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose() {
    this.props.clearDropdown();
  }
  
  render () {
    const chans = this.props.channels.slice().reverse();
    
    
    
    let channels;
    if (this.props.dropdown === "channelIndex") {
      channels = chans.filter((channel) => {
        return !channel.is_dm;
      });
    } else if (this.props.dropdown === "messageIndex") {
      channels = chans.filter((channel) => {
        return channel.is_dm;
      });
    }
    
    
    channels = channels.map((channel) => {
      return (
        <ChannelIndexItem
          key={channel.id}
          channel={channel}
          clearDropdown={this.props.clearDropdown} />
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
          <div className="fullscreen-index-list-container custom-scroll">
            <ul className="fullscreen-index-list">
              {channels}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
