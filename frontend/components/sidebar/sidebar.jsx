import React from 'react';
import ChannelIndexContainer from '../channel/channel_index_container';
import UserInfo from '../user_info/user_info.jsx';

const Sidebar = () => (
  <div>
    This is the sidebar
    <UserInfo />
    <ChannelIndexContainer
      channel="Channels" />
  </div>
); // TODO: add channel="DM" later

export default Sidebar;
