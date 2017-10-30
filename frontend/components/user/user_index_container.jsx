import { connect } from 'react-redux';
import React from 'react';
import UserIndex from './user_index';
import { receiveAllUsers } from '../../actions/user_actions';
import { clearDropdown } from '../../actions/ui_actions';



const mapStateToProps = (state) => {
  return {
    users: state.entities.users,
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveAllUsers: () => dispatch(receiveAllUsers()),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIndex);
