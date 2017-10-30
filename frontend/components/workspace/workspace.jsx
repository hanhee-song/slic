import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChatHeaderContainer from '../chat_header/chat_header_container';

import ChannelSidebarContainer from '../channel/channel_sidebar/channel_sidebar_container';
import UserInfoContainer from '../user_info/user_info_container.jsx';

import ChannelFormContainer from '../channel/channel_form/channel_form_container';
import ChannelIndexContainer from '../channel/channel_index/channel_index_container';
import UserIndexContainer from '../user/user_index_container';

import MessageIndexContainer from '../message/message_index_container';

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
    
    this.props.fetchChannels();
    
    const channelId = this.props.currentUser.most_recent_channel_id;
    
    if (channelId) {
      this.props.history.push(`/channels/${channelId}`);
      this.props.rememberCurrentChannelId(this.props.currentUser, channelId);
    }
    
    var channel = pusher.subscribe('channel-connection');
    channel.bind('update-channel', (channel) => {
      this.props.fetchChannel(channel.id);
    });
  }
  
  componentWillUnmount(nextProps, nextState) {
    document.removeEventListener("keydown", this.handleEscape, false);
  }
  
  render () {
    let dropdown;
    switch (this.props.dropdown) {
      case "channelNew":
        dropdown = (
          <Switch>
            <Route
              component={ChannelFormContainer}
              path="/channels/:channelId" />
            <Route
              component={ChannelFormContainer}
              path="/" />
          </Switch>
        );
        break;
      case "channelIndex":
        dropdown = <ChannelIndexContainer />;
        break;
      case "userIndex":
        dropdown = <UserIndexContainer
          currentChannelId={parseInt(this.props.match.params.channelId)} />;
        break;
      default:
        break;
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
        
        <div className="chat-main">
          <Route
            component={ChatHeaderContainer}
            path="/channels/:channelId" />
          <Route
            component={MessageIndexContainer}
            path="/channels/:channelId" />
        </div>
      </div>
    );
  }
}

export default Workspace;
