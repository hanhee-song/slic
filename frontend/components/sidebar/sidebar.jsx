import React from 'react';
import ChannelSidebarContainer from '../channel/channel_sidebar/channel_sidebar_container';
import UserInfoContainer from '../user_info/user_info_container.jsx';

const Sidebar = () => (
  <div className="sidebar">
    <UserInfoContainer />
    <ChannelSidebarContainer
      channel="Channels" />
  </div>
); // TODO: add channel="DM" later

export default Sidebar;
