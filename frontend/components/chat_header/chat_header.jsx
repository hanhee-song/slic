import React from 'react';

class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.rememberCurrentChannelId(
      this.props.currentUser, { channelId: this.props.channel.id });
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.channel.id !== nextProps.channel.id) {
      nextProps.rememberCurrentChannelId(
        nextProps.currentUser, { channelId: nextProps.channel.id });
    }
  }
  
  render () {
    const userCount = this.props.channel.user_count;
    return (
      <div className="chat-header">
        
        <div className="chat-header-left">
          <div className="chat-header-left-title button">
            # {this.props.channel.name}
          </div>
          <div className="chat-header-left-options">
            <div className="chat-header-left-options blue-hover button chat-hoverable">
              <i className="fa fa-user-o" aria-hidden="true"></i>
              <div>{userCount}</div>
            </div>
            <div className="chat-info-bubble users">
              View Member List
            </div>
          </div>
        </div>
        
        <div className="chat-header-right">
          <div className="chat-header-right-options info blue-hover button chat-hoverable">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
          <div className="chat-info-bubble details">
            Show Channel Details
          </div>
          
          <div className="chat-header-right-options settings blue-hover button chat-hoverable">
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
