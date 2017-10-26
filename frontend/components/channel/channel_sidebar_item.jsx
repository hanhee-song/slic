import React from 'react';

class ChannelSidebarItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  makeChannelInvisible() {
    return () => {
      this.props.makeChannelInvisible(this.props.channel);
    };
  }
  
  render () {
    return (
      <li className="sidebar-section-item button">
        {this.props.channel.name}
        <i
          onClick={this.makeChannelInvisible()}
          className="fa fa-times-circle-o"></i>
      </li>
    );
  }
}

export default ChannelSidebarItem;
