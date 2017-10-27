import React from 'react';

class ChannelSidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleHideChannel = this.handleHideChannel.bind(this);
    this.handleSetChannel = this.handleSetChannel.bind(this);
  }
  
  handleSetChannel() {
    this.props.setCurrentChannel(this.props.channel.id);
    debugger;
  }
  
  handleHideChannel() {
    this.props.makeChannelInvisible(this.props.channel);
  }
  
  render () {
    return (
      <li className="sidebar-section-item button">
        <div onClick={this.handleSetChannel}>
          # {this.props.channel.name}
        </div>
        <i
          onClick={this.handleHideChannel}
          className="fa fa-times-circle-o"></i>
      </li>
    );
  }
}

export default ChannelSidebarItem;
