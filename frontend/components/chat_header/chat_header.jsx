import React from 'react';
import Modal from 'react-modal';

class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      modalOne: false,
      modalTwo: false,
    };
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
  
  openModal(modal) {
    return () => {
      this.setState({ [modal]: true });
    };
  }
  
  closeModal() {
    this.setState({
      modalOne: false,
      modalTwo: false,
    });
  }
  
  modal(field) {
    return (
      <Modal
        className="user-info-modal"
        overlayClassName="modal-overlay"
        isOpen={this.state[field]}
        onRequestClose={this.closeModal}>
        <div
          className="user-info-modal-header">
          {this.props.currentUser.username}
        </div>
        
        <div
          className="user-info-button"
          onClick={this.logout}>
          Logout
        </div>
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
            onClick={this.openModal("modalOne")}>
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
            onClick={this.openModal("modalTwo")}>
            <i className="fa fa-cog" aria-hidden="true"></i>
          </div>
          <div className="chat-info-bubble settings">
            Channel Settings
          </div>
        </div>
        
        {this.modal("modalOne")}
        {this.modal("modalTwo")}
      </div>
    );
  }
}

export default ChatHeader;
