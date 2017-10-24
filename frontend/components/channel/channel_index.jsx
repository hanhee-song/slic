import React from 'react';
import ChannelIndexItem from './channel_index_item';
import { Link } from 'react-router-dom';
import ChannelFormContainer from './channel_form_container';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleChannelDropdown = this.handleChannelDropdown.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchChannels();
  }
  
  handleChannelDropdown() {
    this.props.receiveDropdown("newChannel");
  }
  
  render () {
    
    let newChannelForm;
    if (this.props.dropdown === "newChannel") {
      newChannelForm = (
        <ChannelFormContainer />
      );
    }
    
    const channels = this.props.channels.map((channel) => (
      <ChannelIndexItem
        key={channel.id}
        channel={channel}/>
    ));
    
    return (
      <div>
        
        {channels}
        <button
          onClick={this.handleChannelDropdown}>new channel</button>
        {newChannelForm}
      </div>
    );
  }
}

export default ChannelIndex;
