import React from 'react';
import { Link } from 'react-router-dom';
import ChannelSidebarItemContainer from './channel_sidebar_item_container';


class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChannelNew = this.handleChannelNew.bind(this);
    this.handleChannelIndex = this.handleChannelIndex.bind(this);
    this.handleMessageNew = this.handleMessageNew.bind(this);
    this.handleMessageIndex = this.handleMessageIndex.bind(this);
  }
  
  handleChannelNew() {
    this.props.receiveDropdown("channelNew");
  }
  
  handleChannelIndex() {
    this.props.receiveDropdown("channelIndex");
  }
  
  handleMessageNew() {
    this.props.receiveDropdown("messageNew");
  }
  
  handleMessageIndex() {
    this.props.receiveDropdown("messageIndex");
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
    // channel items with a type of "message" have the x conditionally show
    
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
            onClick={this.handleMessageIndex}
            className="sidebar-section-title channels link sidebar-hoverable">
            Direct Messages
          </div>
          <div className="sidebar-info-bubble">
            Browse all direct messages
          </div>
          <i
            onClick={this.handleMessageNew}
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
