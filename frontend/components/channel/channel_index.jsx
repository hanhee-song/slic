import React from 'react';
import ChannelItemContainer from './channel_item_container';
import { Link } from 'react-router-dom';
import ChannelFormContainer from './channel_form_container';

class ChannelIndex extends React.Component {
  
  componentDidMount() {
    this.props.fetchChannels();
  }
  
  handleNewChannel() {
    this.props.receiveDropdown("newChannel");
  }
  
  render () {
    
    let ChannelFormContainer;
    if (this.props.dropdown === "newChannel") {
      ChannelFormContainer = (
        <ChannelFormContainer />
      );
    }
    
    const channels = this.props.channels.map((channel) => (
      <ChannelItemContainer
        key={channel.id}
        channel={channel}/>
    ));
    
    return (
      <div>
        
        {channels}
        {ChannelFormContainer}
      </div>
    );
  }
}

export default ChannelIndex;
