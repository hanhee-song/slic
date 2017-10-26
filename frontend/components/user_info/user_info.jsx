import React from 'react';
import Modal from 'react-modal';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  
  handleClick(e) {
    this.props.receiveDropdown("userInfo");
  }
  
  logout(e) {
    this.props.logout();
  }

  render () {
    return (
      <div>
        <div
          className="sidebar-button button"
          onClick={this.openModal}>
          <div className="sidebar-button-title">
            Workspace  <i class="fa fa-angle-down" aria-hidden="true"></i>
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
          className="user-info-modal"
          overlayClassName="modal-overlay"
          isOpen={this.state.modalIsOpen}
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
      </div>
    );
  }
}


export default UserInfo;
