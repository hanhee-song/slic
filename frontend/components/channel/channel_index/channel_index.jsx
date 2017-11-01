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
    
    
    
    let channels = [];
    let channelsSubscribed = [];
    if (this.props.dropdown === "channelIndex") {
      channels = chans.filter((channel) => {
        return !channel.is_dm && !channel.subscribed;
      });
      channelsSubscribed = chans.filter((channel) => {
        return !channel.is_dm && channel.subscribed;
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
    channelsSubscribed = channelsSubscribed.map((channel) => {
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
            {
              this.props.dropdown === "channelIndex" ?
              "Browse Channels" :
              "View Messages"
            }
          </div>
          <div className="fullscreen-index-list-container custom-scroll">
            { this.props.dropdown === "channelIndex" &&
              channels.length > 0 &&
              <div className="fullscreen-subheader">
                Channels you can join
              </div>
            }
            <ul className="fullscreen-index-list">
              {channels}
            </ul>
            
            { this.props.dropdown === "channelIndex" &&
              channelsSubscribed.length > 0 &&
              <div className="fullscreen-subheader">
                Channels you belong to
              </div>
            }
            <ul className="fullscreen-index-list">
              {channelsSubscribed}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
