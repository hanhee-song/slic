import React from 'react';
import { connect } from 'react-redux';
import UserDropdown from './user_dropdown';
import { clearDropdown } from '../../actions/ui_actions';


const mapStateToProps = (state) => {
  return {
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDropdown);
