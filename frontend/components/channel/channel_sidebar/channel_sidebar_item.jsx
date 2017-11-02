import React from 'react';
import { Link } from 'react-router-dom';
import { findNextChannelId } from '../../../util/find_next_channel_id.js';

class ChannelSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleHideChannel = this.handleHideChannel.bind(this);
    this.handleSelectChannel = this.handleSelectChannel.bind(this);
  }
  
  handleHideChannel() {
    this.props.makeChannelInvisible(this.props.channel);
    if (this.props.channel.id === this.props.selectedChannelId) {
      this.props.rememberCurrentChannelId(
        this.props.currentUser, this.props.nextChannelId);
    }
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
    
    // const link = selected ? this.props.nextChannelId : this.props.channel.id;
    return (
      <li className={`sidebar-section-item button ${selected}`}>
        <Link
          onClick={this.handleSelectChannel}
          to={`/channels/${this.props.channel.id}${this.props.details}`}>
          <div className="sidebar-section-item-inner">
            {prefix}
            {this.props.channel.name}
          </div>
        </Link>
        
        { this.props.type === "message" &&
          (
            selected ?
            <Link
              to={`/channels/${this.props.nextChannelId}/${this.props.details}`}
              onClick={this.handleHideChannel}>
              <i className="fa fa-times-circle-o"></i>
            </Link>
            :
            <i
              onClick={this.handleHideChannel}
              className="fa fa-times-circle-o"></i>
          )
        }
      </li>
    );
  }
}

export default ChannelSidebarItem;
