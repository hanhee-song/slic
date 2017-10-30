import React from 'react';
import { Link } from 'react-router-dom';

class ChannelSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleHideChannel = this.handleHideChannel.bind(this);
    this.handleSelectChannel = this.handleSelectChannel.bind(this);
  }
  
  handleHideChannel() {
    this.props.makeChannelInvisible(this.props.channel);
  }
  
  handleSelectChannel() {
    this.props.rememberCurrentChannelId(this.props.currentUser, this.props.channel.id);
  }
  
  render () {
    let leaveButton;
    if (this.props.type === "message") {
      leaveButton = (
        <i
          onClick={this.handleHideChannel}
          className="fa fa-times-circle-o"></i>
      );
    }
    
    const selected = this.props.channel.id === this.props.selectedChannelId ?
      "selected" : "";
    
    return (
      <li className={`sidebar-section-item button ${selected}`}>
        <Link
          onClick={this.handleSelectChannel}
          to={`/channels/${this.props.channel.id}`}>
          <div className="sidebar-section-item-inner">
            # {this.props.channel.name}
          </div>
        </Link>
        
        {leaveButton}
      </li>
    );
  }
}

export default ChannelSidebarItem;
