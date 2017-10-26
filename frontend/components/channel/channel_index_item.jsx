import React from 'react';

class ChannelIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchChannel(this.props.channelId);
  }
  
  render () {
    const userCount = this.props.users.length;
    return (
      <div
        onClick={this.props.clearDropdown}>
        name: {this.props.channel.name}
        <br />
        description: {this.props.channel.description}
        <br />
        users: {userCount}
      </div>
    );
  }
}

export default ChannelIndexItem;
