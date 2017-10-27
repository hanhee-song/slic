import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import ChatHeaderContainer from '../chat_header/chat_header_container';
import ChannelIndexContainer from '../channel/channel_index/channel_index_container';
import ChannelFormContainer from '../channel/channel_form/channel_form_container';

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.handleEscape = this.handleEscape.bind(this);
  }
  
  handleEscape(e) {
    if (e.keyCode === 27) {
      this.props.clearDropdown();
    }
  }
  
  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
    const channelId = this.props.currentUser.most_recent_channel_id;
    if (channelId) {
      this.props.history.push(`/channels/${channelId}`);
    }
  }
  
  componentWillUnmount(nextProps, nextState) {
    document.removeEventListener("keydown", this.handleEscape, false);
  }
  
  render () {
    let dropdown;
    if (this.props.dropdown === "channelNew") {
      dropdown = <ChannelFormContainer />;
    } else if (this.props.dropdown === "channelIndex") {
      dropdown = <ChannelIndexContainer />;
    }
    
    return (
      <div className="workspace">
        {dropdown}
        <Sidebar />
        
        <div className="chat">
          <Route
            component={ChatHeaderContainer}
            path="/channels/:channelId" />
          
        </div>
      </div>
    );
  }
}

export default Workspace;
