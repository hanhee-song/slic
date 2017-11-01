import React from 'react';
import { Link } from 'react-router-dom';

class ChannelSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleHideChannel = this.handleHideChannel.bind(this);
    this.handleSelectChannel = this.handleSelectChannel.bind(this);
    
    const nextChannel = Object.values(this.props.channels)
      .filter((channel) => {
        return channel.visible === true;
      })[0];
      let nextChannelId;
    if (nextChannel) {
      nextChannelId = nextChannel.id;
    }
    
    this.state = {
      nextChannelId: nextChannelId,
    };
  }
  
  handleHideChannel() {
    this.props.makeChannelInvisible(this.props.channel);
    this.props.rememberCurrentChannelId(
      this.props.currentUser, this.state.nextChannelId);
  }
  
  handleSelectChannel() {
    this.props.rememberCurrentChannelId(this.props.currentUser, this.props.channel.id);
  }
  
  render () {
    const selected = this.props.channel.id === this.props.selectedChannelId ?
      "selected" : "";
    
    let prefix;
    
    if (!this.props.channel.is_dm) {
      prefix = "# ";
    } else if (this.props.channel.is_dm
        && Object.values(this.props.channel.users).length > 2) {
      prefix = `(${Object.values(this.props.channel.users).length - 1}) `;
    }
    
    return (
      <li className={`sidebar-section-item button ${selected}`}>
        <Link
          onClick={this.handleSelectChannel}
          to={`/channels/${this.props.channel.id}`}>
          <div className="sidebar-section-item-inner">
            {prefix}
            {this.props.channel.name}
          </div>
        </Link>
        
        { this.props.type === "message" &&
          <Link
            to={`/channels/${this.state.nextChannelId}`}
            onClick={this.handleHideChannel}>
            <i
              className="fa fa-times-circle-o"></i>
          </Link>
        }
      </li>
    );
  }
}

export default ChannelSidebarItem;
