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
      <Link to={`/channels/${this.props.channel.id}`}>
        <li className="sidebar-section-item button">
          # {this.props.channel.name}
          <i
            onClick={this.handleHideChannel}
            className="fa fa-times-circle-o"></i>
        </li>
      </Link>
    );
  }
}

export default ChannelSidebarItem;
