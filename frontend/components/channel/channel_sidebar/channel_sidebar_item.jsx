import React from 'react';
import { Link } from 'react-router-dom';

class ChannelSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleHideChannel = this.handleHideChannel.bind(this);
  }
  
  handleHideChannel() {
    this.props.makeChannelInvisible(this.props.channel);
  }
  
  render () {
    const channel = this.props.channel;
    
    const selected = channel.id === this.props.selectedChannelId ?
      "selected" : "";
    
    let name;
    if (channel.name) {
      if (!channel.is_dm) {
        if (channel.is_private) {
          name = (
            <div>
              <i className="fa fa-lock" aria-hidden="true"></i>&nbsp;
                {channel.name}
              </div>
            );
          } else {
            name = `# ${channel.name}`;
          }
      } else if (Object.values(channel.users).length > 2) {
        name = `(${Object.values(channel.users).length - 1}) ${channel.name}`;
      } else {
        name = channel.name;
      }
    }
    
    return (
      <li className={`sidebar-section-item button ${selected}`}>
        <Link

          to={`/channels/${channel.id}${this.props.details}`}>
          <div className="sidebar-section-item-inner">
            {name}
          </div>
        </Link>
        
        { this.props.type === "message" &&
          (
            selected ?
            <Link to={`/channels/${this.props.nextChannelId}/${this.props.details}`}
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
