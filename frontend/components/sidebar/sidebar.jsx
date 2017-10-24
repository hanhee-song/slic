import React from 'react';
import ChannelIndexContainer from '../channel/channel_index_container';
import UserInfoContainer from '../user_info/user_info_container.jsx';

const Sidebar = () => (
  <div className="sidebar">
    <UserInfoContainer />
    <ChannelIndexContainer
      channel="Channels" />
  </div>
); // TODO: add channel="DM" later

export default Sidebar;
