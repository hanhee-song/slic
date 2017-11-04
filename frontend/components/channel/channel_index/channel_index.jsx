import React from 'react';
import ChannelIndexItemContainer from './channel_index_item_container';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closeFlag: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
  }
  
  componentWillUnmount(nextProps, nextState) {
    document.removeEventListener("keydown", this.handleEscape, false);
  }
  
  handleEscape(e) {
    if (e.keyCode === 27) {
      this.handleClose();
    }
  }
  
  handleClose() {
    this.setState({ closeFlag: "closing" });
    setTimeout(() => {
      this.props.clearDropdown();
    }, 300);
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
    
    if (this.props.dropdown === "messageIndex") {
      channels.sort((a, b) => {
        const first = new Date(a.most_recent_activity);
        const second = new Date(b.most_recent_activity);
        return first > second ? 1 : -1;
      });
    } else {
      channels.sort((a, b) => {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      });
      channelsSubscribed.sort((a, b) => {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      });
    }
    
    channels = channels.map((channel) => {
      return (
        <ChannelIndexItemContainer
          key={channel.id}
          channel={channel}
          handleClose={this.handleClose} />
        );
    });
    
    channelsSubscribed = channelsSubscribed.map((channel) => {
      return (
        <ChannelIndexItemContainer
          key={channel.id}
          channel={channel}
          handleClose={this.handleClose} />
        );
    });
    
    
    return (
      <div className={`fullscreen-container ${this.state.closeFlag}`}>
        <div className={`fullscreen-inside ${this.state.closeFlag}`}>
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
                <div className="fullscreen-subheader-underline"></div>
              </div>
            }
            <ul className="fullscreen-index-list">
              {channels}
            </ul>
            
            { this.props.dropdown === "channelIndex" &&
              channelsSubscribed.length > 0 &&
              <div className="fullscreen-subheader">
                Channels you belong to
                <div className="fullscreen-subheader-underline"></div>
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
