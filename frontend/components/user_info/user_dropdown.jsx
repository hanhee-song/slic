import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import Modal from 'react-modal';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  
  handleClickOutside() {
    this.props.clearDropdown();
  }
  
  
  handleClose(e) {
    e.preventDefault();
    this.props.clearDropdown();
  }
  
  render () {
    return (
      <Modal
        isOpen={Boolean(this.props.dropdown)}>
        This is a modal
      </Modal>
    );
  }
}

export default onClickOutside(UserDropdown);
