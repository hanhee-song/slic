import React from 'react';
import UserDropdownContainer from './user_dropdown_container';
import Modal from 'react-modal';

const customStyles = {
  content: {
    
  }
};

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render () {
    let userDropdown;
    if (this.props.dropdown === "userInfo") {
      userDropdown = (
        <UserDropdownContainer />
      );
    }
    
    return (
      <div>
        <div
          className="sidebar-button button"
          onClick={this.openModal}>
          <div className="sidebar-button-title">
            Workspace
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
        {userDropdown}
        
        <Modal
          className="user-info-modal"
          overlayClassName="modal-overlay"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}>
          hi
        </Modal>
      </div>
    );
  }
}


export default UserInfo;
