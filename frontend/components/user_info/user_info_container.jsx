import { connect } from 'react-redux';
import React from 'react';
import UserInfo from './user_info';
import { logout } from '../../actions/session_actions';
import { clearChannels } from '../../actions/channel_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    clearChannels: () => dispatch(clearChannels()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
