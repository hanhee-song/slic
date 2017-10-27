import React from 'react';
import ChannelIndexItemContainer from './channel_index_item_container';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }
  
  // componentDidMount() {
  //   this.props.fetchChannels();
  // }
  
  handleClose() {
    this.props.clearDropdown();
  }
  
  componentDidMount() {
    this.props.fetchChannels();
  }
  
  componentWillUnmount(nextProps, nextState) {
    this.props.fetchChannels({ visible: true });
  }
  
  render () {
    const channels = this.props.channels.reverse().map((channel) => {
      return (
        <ChannelIndexItemContainer
          key={channel.id}
          channel={channel} />
        );
    });
    return (
      <div className="channel-new-container">
        <div className="channel-new-inside">
          <div
            className="channel-new-x"
            onClick={this.handleClose}>
            <i className="fa fa-times" aria-hidden="true"></i>
            <div className="channel-new-esc">esc</div>
          </div>
          <div className="channel-new-header">
            Browse Channels
          </div>
          <div className="channel-new-list-header">
            Channels you can join
          </div>
          <div className="channel-new-list-container">
            <ul className="channel-new-list">
              {channels}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
