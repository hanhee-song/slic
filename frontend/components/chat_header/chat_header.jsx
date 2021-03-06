import React from 'react';
import Modal from 'react-modal';

class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      nameModal: false,
      settingsModal: false,
    };
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleShowUsers = this.handleShowUsers.bind(this);
    this.handleShowDetails = this.handleShowDetails.bind(this);
  }
  
  openModal(modal) {
    return () => {
      this.setState({ [modal]: true });
    };
  }
  
  closeModal() {
    this.setState({
      nameModal: false,
      settingsModal: false,
    });
  }
  
  handleJoin() {
    this.props.subscribeUserIdsToChannel(this.props.channel, [this.props.currentUser.id])
      .then(
        response => {
          this.closeModal();
        }
      );
  }
  
  handleInvite() {
    this.props.receiveDropdown("inviteIndex");
    this.closeModal();
  }
  
  handleLeave() {
    this.props.unsubscribeUserIdsFromChannel(
      this.props.channel,
      [this.props.currentUser.id]
    );
    
    this.props.history.push(`/channels/${this.props.nextChannelId}`);
    this.closeModal();
  }
  
  handleShowUsers() {
    this.props.receiveDetails({ users: true });
  }
  
  handleShowDetails() {
    this.props.details.visible ?
      this.props.closeDetails() : this.props.receiveDetails();
  }
  
  modal(field) {
    let cssName;
    switch (field) {
      case "nameModal":
        cssName = "name-modal";
        break;
      case "settingsModal":
        cssName = "settings-modal";
        break;
      default:
        return "";
    }
    
    const isGeneral = this.props.channel.name === 'general';
    const isSubscribed = this.props.channel.subscribed;
    const isDm = this.props.channel.is_dm;
    
    return (
      <Modal
        className={`modal-interior ${cssName}`}
        overlayClassName="modal-overlay"
        isOpen={this.state[field]}
        onRequestClose={this.closeModal}>
        
        {isSubscribed &&
          <div
            className="modal-button"
            onClick={this.handleInvite}>
            {
              isDm ?
              "Invite another member ..." :
              "Invite new members to join ..."
            }
            
          </div>
        }
        
        {!isGeneral && isSubscribed && !isDm &&
          <div
            className="modal-button"
            onClick={this.handleLeave}>
            Leave #{this.props.channel.name}
          </div>
        }
        
        {!isSubscribed && !isDm &&
          <div
            className="modal-button"
            onClick={this.handleJoin}>
            Join #{this.props.channel.name}
          </div>
        }
      </Modal>
    );
  }
  
  
  render () {
    const channel = this.props.channel;
    let name;
    if (channel.name) {
      if (channel.is_dm) {
        name = channel.name;
      } else {
        if (channel.is_private) {
          name = (
            <div>
              <i className="fa fa-lock" aria-hidden="true"></i>&nbsp;
              {channel.name}
            </div>
          );
        } else {
          name = `# ${channel.name}`;
        }
      }
    }
    
    const userCount = channel.user_count;
    return (
      <div className="chat-header">
        
        <div className="chat-header-left">
          <div
            className="chat-header-left-title button"
            onClick={this.openModal("nameModal")}>
            {name}
          </div>
          <div className="chat-header-left-options">
            <div
              className="chat-header-left-options blue-hover button chat-hoverable"
              onClick={this.handleShowUsers}>
              <i className="fa fa-user-o" aria-hidden="true"></i>
              <div>{userCount}</div>
            </div>
            <div className="chat-info-bubble users">
              View Member List
            </div>
          </div>
        </div>
        
        <div className="chat-header-right">
          <div className="chat-header-right-options info blue-hover button chat-hoverable"
            onClick={this.handleShowDetails}>
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </div>
          <div className="chat-info-bubble details">
            {
              this.props.details.visible ?
              "Hide Channel Details"
              :
              "Show Channel Details"
            }
          </div>
          
          <div
            className="chat-header-right-options settings blue-hover button chat-hoverable"
            onClick={this.openModal("settingsModal")}>
            <i className="fa fa-cog" aria-hidden="true"></i>
          </div>
          <div className="chat-info-bubble settings">
            Channel Settings
          </div>
        </div>
        
        {this.modal("nameModal")}
        {this.modal("settingsModal")}
      </div>
    );
  }
}

export default ChatHeader;
