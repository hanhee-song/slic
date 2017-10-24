import { connect } from 'react-redux';
import React from 'react';
import UserInfo from './user_info';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
