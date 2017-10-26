import React from 'react';
import { Link } from 'react-router-dom';
import ChannelSidebarItemContainer from './channel_sidebar_item_container';
import ChannelIndexContainer from './channel_index_container';
import ChannelFormContainer from './channel_form_container';

class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChannelNew = this.handleChannelNew.bind(this);
    this.handleChannelIndex = this.handleChannelIndex.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchChannels({ visible: true });
  }
  
  handleChannelNew() {
    this.props.receiveDropdown("channelNew");
  }
  
  handleChannelIndex() {
    this.props.receiveDropdown("channelIndex");
  }
  
  render () {
    
    let dropdown;
    if (this.props.dropdown === "channelNew") {
      dropdown = <ChannelFormContainer />;
    } else if (this.props.dropdown === "channelIndex") {
      dropdown = <ChannelIndexContainer />;
    }
    
    const channels = this.props.channels.map((channel) => (
      <ChannelSidebarItemContainer
        key={channel.id}
        channel={channel}/>
    ));
    
    return (
      <div className="sidebar-section">
        {dropdown}
        <div className="sidebar-section-header">
          <div
            className="sidebar-section-title channels link"
            onClick={this.handleChannelIndex}>
            Channels
          </div>
          <i
            onClick={this.handleChannelNew}
            className="fa fa-plus link"
            aria-hidden="true"></i>
        </div>
        <ul className="sidebar-section-items channels">
          {channels}
        </ul>
      </div>
    );
  }
}

export default ChannelSidebar;
