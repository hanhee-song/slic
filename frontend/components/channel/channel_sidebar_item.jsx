import React from 'react';

class ChannelSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.makeChannelInvisible(this.props.channel);
  }
  
  render () {
    return (
      <li className="sidebar-section-item button">
        {this.props.channel.name}
        <i
          onClick={this.handleClick}
          className="fa fa-times-circle-o"></i>
      </li>
    );
  }
}

export default ChannelSidebarItem;
