import React from 'react';

class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-header-left-title button">
            # Temporary title
          </div>
          <div class="chat-header-left-options">
            <div class="chat-header-left-options users button">
              <i class="fa fa-user-o" aria-hidden="true"></i> 71
            </div>
          </div>
        </div>
        
        <div class="chat-header-right">
          <div class="chat-header-right-options info button">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </div>
          <div class="chat-header-right-options settings button">
            <i class="fa fa-cog" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatHeader;
