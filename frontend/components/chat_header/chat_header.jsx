import React from 'react';

class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div className="chat-header">
        
        <div className="chat-header-left">
          <div className="chat-header-left-title button">
            # Temporary title
          </div>
          <div className="chat-header-left-options">
            <div className="chat-header-left-options users button chat-hoverable">
              <i className="fa fa-user-o" aria-hidden="true"></i> 71
            </div>
            <div className="chat-info-bubble">
              View Member List
            </div>
          </div>
        </div>
        
        <div className="chat-header-right">
          <div className="chat-header-right-options info button chat-hoverable">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
          <div className="chat-info-bubble details">
            Show Channel Details
          </div>
          
          <div className="chat-header-right-options settings button chat-hoverable">
            <i className="fa fa-cog" aria-hidden="true"></i>
          </div>
          <div className="chat-info-bubble settings">
            Channel Settings
          </div>
        </div>
        
      </div>
    );
  }
}

export default ChatHeader;
