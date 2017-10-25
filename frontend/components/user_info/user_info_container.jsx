import { connect } from 'react-redux';
import React from 'react';
import UserInfo from './user_info';
import { receiveDropdown, clearDropdown } from '../../actions/ui_actions';


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
