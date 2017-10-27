import React from 'react';
import Sidebar from '../sidebar/sidebar';
import ChatHeaderContainer from '../chat_header/chat_header_container';

const Workspace = () => (
  <div className="workspace">
    <Sidebar />
    <div className="chat">
      <ChatHeaderContainer />
    </div>
  </div>
);

export default Workspace;
