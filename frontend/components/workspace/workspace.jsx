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

class Workspace extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.fetchChannels();
    
    const channelId = this.props.currentUser.most_recent_channel_id;
    
    if (channelId) {
      const details = this.props.match.path === "/channels/:channelId/details"
        ? "/details" : "";
      this.props.history.push(`/channels/${channelId}${details}`);
      if (details) {
        this.props.receiveDetails();
      }
    }
    
    var channel = pusher.subscribe('channel-connection');
    channel.bind('update-channel', (channel) => {
      this.props.fetchChannel(channel.id);
    });
  }
  
  componentWillReceiveProps(nextProps) {
    const nextChannelId = nextProps.match.params.channelId;
    
    if (this.props.match.params.channelId !== nextChannelId) {
      this.props.fetchChannel(nextChannelId);
      // TODO: DON'T REMEMBER THE CHANNEL IF THE USER ISN'T A PART OF IT
      // AND IT'S PRIVATE OR NOT VALID
      this.props.rememberCurrentChannelId(this.props.currentUser, nextChannelId);
    }
    
    if (this.props.details !== nextProps.details) {
      this.props.history.push(`/channels/${nextChannelId}${nextProps.details}`);
    } else if (this.props.match.params.channelId !== nextChannelId
      && nextProps.details && nextProps.match.path !== "/channels/:channelId/details") {
        this.props.history.push(`/channels/${nextChannelId}${nextProps.details}`);
    }
    
    // if (this.props.match.params.channelId !== nextProps.match.params.channelId
    //   && this.props.match.path === "/channels/:channelId/details") {
    //   this.props.history.push(`/channels/${nextProps.match.params.channelId}/details`);
    // }
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
            path="/channels/:channelId/details" />
          <Route
            component={ChannelSidebarContainer}
            path="/channels/:channelId/details" />
          <Route
            component={UserInfoContainer}
            exact path="/channels/:channelId" />
          <Route
            component={ChannelSidebarContainer}
            exact path="/channels/:channelId" />
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
            exact path="/channels/:channelId/details" />
          <Route
            component={ChatHeaderContainer}
            exact path="/channels/:channelId" />
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
