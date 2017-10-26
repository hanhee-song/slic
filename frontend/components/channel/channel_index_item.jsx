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
    let description;
    if (this.props.channel.description) {
      description = (
        <div className="channel-new-list-item description">
          {this.props.channel.description}
        </div>
      );
    }
    return (
      <li
        onClick={this.props.clearDropdown}>
        <div className="channel-new-list-item-left">
          <div className="channel-new-list-item title">
            <div className="channel-new-list-item hashtag">
              #
            </div>
            <div className="channel-new-list-item name">
              {this.props.channel.name}
            </div>
          </div>
          {description}
        </div>
        <div className="channel-new-list-item users">
          users: {userCount}
        </div>
      </li>
    );
  }
}

export default ChannelIndexItem;
