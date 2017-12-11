import React from 'react';
import { Link } from 'react-router-dom';
import ChannelSidebarItemContainer from './channel_sidebar_item_container';


class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropdown = this.handleDropdown.bind(this);
  }
  
  handleDropdown(field) {
    return () => {
      this.props.receiveDropdown(field);
    };
  }
  
  render () {
    const channels = this.props.channels
      .filter((channel) => {
        return channel.visible && !channel.is_dm;
      })
      .map((channel) => {
        return (
          <ChannelSidebarItemContainer
            key={channel.id}
            channel={channel}
            type={"channel"}
            selectedChannelId={this.props.selectedChannelId}/>
        );
      });
    
    const dms = this.props.channels
      .filter((channel) => {
        return channel.visible && channel.is_dm;
      })
      .map((channel) => {
        return (
          <ChannelSidebarItemContainer
            key={channel.id}
            channel={channel}
            type={"message"}
            selectedChannelId={this.props.selectedChannelId}/>
        );
      });
    
    return (
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <div
            className="sidebar-section-title channels link sidebar-hoverable"
            onClick={this.handleDropdown("channelNew")}>
            Channels
          </div>
          <div className="sidebar-info-bubble">
            Browse All Channels
          </div>
          <i
            onClick={this.handleDropdown("channelIndex")}
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
            onClick={this.handleDropdown("messageNew")}
            className="sidebar-section-title channels link sidebar-hoverable">
            Direct Messages
          </div>
          <div className="sidebar-info-bubble">
            Browse all direct messages
          </div>
          <i
            onClick={this.handleDropdown("messageIndex")}
            className="sidebar-hoverable fa fa-plus link"
            aria-hidden="true"></i>
          <div className="sidebar-info-bubble dm-2">
            Open a direct message
          </div>
        </div>
        <ul className="sidebar-section-items channels">
          {dms}
        </ul>
      </div>
    );
  }
}

export default ChannelSidebar;
