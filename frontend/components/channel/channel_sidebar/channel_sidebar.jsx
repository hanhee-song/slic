import React from 'react';
import { Link } from 'react-router-dom';
import ChannelSidebarItemContainer from './channel_sidebar_item_container';


class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChannelNew = this.handleChannelNew.bind(this);
    this.handleChannelIndex = this.handleChannelIndex.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchChannels();
  }
  
  handleChannelNew() {
    this.props.receiveDropdown("channelNew");
  }
  
  handleChannelIndex() {
    this.props.receiveDropdown("channelIndex");
  }
  
  render () {
    

    
    const channels = this.props.channels
      .filter((channel) => {
        return channel.visible;
      })
      .map((channel) => {
        return (
          <ChannelSidebarItemContainer
            key={channel.id}
            channel={channel}/>
        );
      });
    
    return (
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <div
            className="sidebar-section-title channels link sidebar-hoverable"
            onClick={this.handleChannelIndex}>
            Channels
          </div>
          <div className="sidebar-info-bubble">
            Browse All Channels
          </div>
          <i
            onClick={this.handleChannelNew}
            className="sidebar-hoverable fa fa-plus link"
            aria-hidden="true"></i>
          <div className="sidebar-info-bubble new">
            Open a new channel
          </div>
        </div>
        <ul className="sidebar-section-items channels">
          {channels}
        </ul>
        
        
        <div className="sidebar-section-header">
          <div
            className="sidebar-section-title channels link sidebar-hoverable"
            >
            Direct Messages
          </div>
          <div className="sidebar-info-bubble">
            Open a direct message
          </div>
          <i
            
            className="sidebar-hoverable fa fa-plus link"
            aria-hidden="true"></i>
          <div className="sidebar-info-bubble dm-2">
            Open a direct message
          </div>
        </div>
        <ul className="sidebar-section-items channels">

        </ul>
      </div>
    );
  }
}

export default ChannelSidebar;