import React from 'react';
import Modal from 'react-modal';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  
  handleLogout() {
    this.props.logout();
  }
  
  render () {
    return (
      <div>
        <div
          className={`sidebar-button button ${this.state.modalIsOpen ? "selected" : ""}`}
          onClick={this.openModal}>
          <div className="sidebar-button-title">
            Workspace  <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
          
          <div className="sidebar-button-subtitle">
            <div className="sidebar-button-status">
              <i className="fa fa-circle"></i>
            </div>
            <div className="sidebar-button-name">
              {this.props.currentUser.username}
            </div>
          </div>
        </div>
        
        <Modal
          className="modal-interior"
          overlayClassName="modal-overlay"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}>
          <div className="modal-header">
            <div className="modal-user-avatar">
              <img className="profile-image"
                  src={this.props.currentUser.avatar_url} />
            </div>
            <div
              className="modal-user-username">
              {this.props.currentUser.username}
            </div>
          </div>
          
          <div
            className="modal-button"
            onClick={this.handleLogout}>
            Logout
          </div>
          
        </Modal>
      </div>
    );
  }
}


export default UserInfo;
