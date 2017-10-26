import React from 'react';

const ChannelSidebarItem = ({ channel }) => {
  return (
    <li className="button">
      {channel.name}
    </li>
  );
};

export default ChannelSidebarItem;
