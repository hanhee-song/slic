import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';

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
      <div>this is a dropdown</div>
    );
  }
}

export default onClickOutside(UserDropdown);
