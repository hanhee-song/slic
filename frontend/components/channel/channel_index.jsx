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
      <div className="sidebar-section">
        <div
          className="sidebar-section-header"
          onClick={this.handleChannelDropdown}>
          <div
            className="sidebar-section-title channels link">
            Channels
          </div>
          <i className="fa fa-plus link" aria-hidden="true"></i>
        </div>
        <ul className="sidebar-section-items channels">
          {channels}
        </ul>
        {newChannelForm}
      </div>
    );
  }
}

export default ChannelIndex;
