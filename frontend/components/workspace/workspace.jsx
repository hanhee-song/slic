import React from 'react';
import Sidebar from '../sidebar/sidebar';
import ChatHeaderContainer from '../chat_header/chat_header_container';
import ChannelIndexContainer from '../channel/channel_index/channel_index_container';
import ChannelFormContainer from '../channel/channel_form/channel_form_container';

class Workspace extends React.Component {
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
        <Sidebar />
        <div className="chat">
          <ChatHeaderContainer />
        </div>
      </div>
    );
  }
}

export default Workspace;
