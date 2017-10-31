import { connect } from 'react-redux';
import React from 'react';
import UserInfo from './user_info';
import { logout } from '../../actions/session_actions';


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
