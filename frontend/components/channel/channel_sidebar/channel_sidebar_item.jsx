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
    return (
      <li className="sidebar-section-item button">
        <Link to={`/channels/${this.props.channel.id}`}>
          <div className="sidebar-section-item-inner">
            # {this.props.channel.name}
          </div>
        </Link>
        <i
          onClick={this.handleHideChannel}
          className="fa fa-times-circle-o"></i>
      </li>
    );
  }
}

export default ChannelSidebarItem;
