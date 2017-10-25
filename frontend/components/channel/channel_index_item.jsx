import React from 'react';

const ChannelIndexItem = ({ channel }) => {
  return (
    <li className="button">
      {channel.name}
    </li>
  );
};

export default ChannelIndexItem;
