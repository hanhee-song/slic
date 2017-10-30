import { connect } from 'react-redux';
import React from 'react';
import UserIndex from './user_index';
import { fetchUsers } from '../../actions/user_actions';
import { clearDropdown } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    users: state.entities.users,
    dropdown: state.ui.dropdown,
    channel: state.entities.channels[ownProps.currentChannelId] || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIndex);
