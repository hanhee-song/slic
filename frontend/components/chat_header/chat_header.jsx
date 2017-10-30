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
  }
  //
  // componentDidMount() {
  //   this.props.rememberCurrentChannelId(
  //     this.props.currentUser, { channelId: this.props.channel.id });
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.channel.id !== nextProps.channel.id) {
  //     nextProps.rememberCurrentChannelId(
  //       nextProps.currentUser, { channelId: nextProps.channel.id });
  //   }
  // }
  
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
  
  handleInvite() {
    this.props.receiveDropdown("userIndex");
    this.closeModal();
  }
  
  handleLeave() {
    this.props.makeChannelInvisible(this.props.channel);
    
    const nextChannel = Object.values(this.props.channels)
      .filter((channel) => {
        return channel.visible === true;
      })[0];
    let nextChannelId;
    if (nextChannel) {
      nextChannelId = nextChannel.id;
    }
    this.props.history.push(`/channels/${nextChannelId}`);
    // is the below necessary anymore?
    // this.props.rememberCurrentChannelId(this.props.currentUser, nextChannelId);
    this.closeModal();
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
        return undefined;
    }
    
    const isGeneral = this.props.channel.name === 'general';
    
    return (
      <Modal
        className={`modal-interior ${cssName}`}
        overlayClassName="modal-overlay"
        isOpen={this.state[field]}
        onRequestClose={this.closeModal}>
        
        <div
          className="modal-button"
          onClick={this.handleInvite}>
          Invite new members to join ...
        </div>
        
        {!isGeneral &&
          <div
            className="modal-button"
            onClick={this.handleLeave}>
            Leave #{this.props.channel.name}
          </div>
        }
      </Modal>
    );
  }
  
  render () {
    const userCount = this.props.channel.user_count;
    return (
      <div className="chat-header">
        
        <div className="chat-header-left">
          <div
            className="chat-header-left-title button"
            onClick={this.openModal("nameModal")}>
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
