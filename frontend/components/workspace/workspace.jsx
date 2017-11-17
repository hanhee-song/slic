import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChatHeaderContainer from '../chat_header/chat_header_container';

import ChannelSidebarContainer from '../channel/channel_sidebar/channel_sidebar_container';
import UserInfoContainer from '../user_info/user_info_container.jsx';

import ChannelFormContainer from '../channel/channel_form/channel_form_container';
import ChannelIndexContainer from '../channel/channel_index/channel_index_container';
import UserIndexContainer from '../user/user_index_container';

import MessageIndexContainer from '../message/message_index_container';
import ChannelDetailsContainer from '../channel/channel_details/channel_details_container';

import ChannelSidebarFooter from '../channel/channel_sidebar/channel_sidebar_footer';

class Workspace extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const channelId = this.props.currentUser.most_recent_channel_id;
    
    this.props.fetchChannels();
    
    if (channelId && this.props.match.path !== "/channels/:channelId/details") {
      this.props.history.push(`/channels/${channelId}/details`);
    }
    this.props.fetchChannel(channelId);
    this.props.receiveDetails();
    
    var channel = pusher.subscribe('channel-connection');
    channel.bind('update-channel', (id) => {
      this.props.fetchChannel(id);
    });
  }
  
  componentWillUnmount() {
    pusher.unsubscribe('channel-connection');
    this.props.clearChannels();
    this.props.clearMessages();
  }
  
  componentWillReceiveProps(nextProps) {
    const nextChannelId = nextProps.match.params.channelId;
    const thisChannelId = this.props.match.params.channelId;
    const channelIds = Object.keys(nextProps.channels);
    
    if (!channelIds.includes(nextChannelId) && channelIds.length > 0) {
      this.props.history.push(`/channels/${this.props.currentUser.most_recent_channel_id}${this.props.details}`);
      return;
    }
    
    if (thisChannelId !== nextChannelId
      && channelIds.includes(nextChannelId)) {
      this.props.fetchChannel(nextChannelId);
      this.props.clearMessages();
      this.props.rememberCurrentChannelId(this.props.currentUser, nextChannelId);
    }
    
    if (this.props.details !== nextProps.details) {
      this.props.history.push(`/channels/${nextChannelId}${nextProps.details}`);
    } else if (thisChannelId !== nextChannelId
      && nextProps.details && nextProps.match.path !== "/channels/:channelId/details") {
        this.props.history.push(`/channels/${nextChannelId}${nextProps.details}`);
    }
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
      case "messageIndex":
        dropdown = <ChannelIndexContainer />;
        break;
      case "inviteIndex":
      case "messageNew":
        dropdown = (
          <Switch>
            <Route
              component={UserIndexContainer}
              path="/channels/:channelId" />
            <Route
              component={UserIndexContainer}
              path="/" />
          </Switch>
        );
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
          <ChannelSidebarFooter />
        </div>
        
        <div className="chat-main">
          <Route
            component={ChatHeaderContainer}
            path="/channels/:channelId" />
          <div className="chat-body">
            <Route
              component={MessageIndexContainer}
              path="/channels/:channelId" />
            <Route
              component={ChannelDetailsContainer}
              path="/channels/:channelId/details" />
          </div>
        </div>
      </div>
    );
  }
}

export default Workspace;
