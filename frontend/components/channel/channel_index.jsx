import React from 'react';
import ChannelItemContainer from './channel_item_container';
import { Link } from 'react-router-dom';

class ChannelIndex extends React.Component {
  
  componentDidMount() {
    this.props.fetchChannels();
  }
  
  render () {
    
    const channels = this.props.channels.map((channel) => (
      <ChannelItemContainer
        key={channel.id}
        channel={channel}/>
    ));
    
    return (
      <div>
        
        {channels}
        <Link to={`/channels/:channelId/new`}>hi</Link>
      </div>
    );
  }
}

export default ChannelIndex;
