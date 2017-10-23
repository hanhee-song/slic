import { connect } from 'react-redux';
import { signup, login, logout } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => {
  const formType = ownProps.location.pathname === '/login' ?
    '/login' : '/signup';
  const email = state.session.email ? state.session.email : "";
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.currentUser,
    formType: formType,
    email: email
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const submitForm = ownProps.location.pathname === '/login' ?
    login : signup;
  return {
    submitForm: (user) => dispatch(submitForm(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
