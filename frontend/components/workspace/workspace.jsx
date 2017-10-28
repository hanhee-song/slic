import React from 'react';
import { Route } from 'react-router-dom';
import ChatHeaderContainer from '../chat_header/chat_header_container';
import ChannelIndexContainer from '../channel/channel_index/channel_index_container';
import ChannelFormContainer from '../channel/channel_form/channel_form_container';

import ChannelSidebarContainer from '../channel/channel_sidebar/channel_sidebar_container';
import UserInfoContainer from '../user_info/user_info_container.jsx';

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
    // debugger;
    if (channelId) {
      this.props.history.push(`/channels/${channelId}`);
      // debugger;
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
        <div className="sidebar">
          <Route
            component={UserInfoContainer}
            path="/channels/:channelId" />
          <Route
            component={ChannelSidebarContainer}
            path="/channels/:channelId" />
          <Route
            component={UserInfoContainer}
            exact path="/channels" />
          <Route
            component={ChannelSidebarContainer}
            exact path="/channels" />
        </div>
        
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
