import { connect } from 'react-redux';
import SessionForm from './session_form';
import {
  signup,
  login,
  logout,
  removeSessionErrors
} from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  const formType = ownProps.location.pathname;
  const email = state.session.email ? state.session.email : "";
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.currentUser,
    formType: formType,
    email: email,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // TEMP: guest login no longer generates a new account
  // const submitForm = ownProps.location.pathname === '/login' ?
  //   login : signup;
  
  // TEMP: make guest login access a pre-seeded account
  const submitForm = ownProps.location.pathname === '/signup' ?
    signup : login;
  //
  
  return {
    submitForm: (user) => dispatch(submitForm(user)),
    removeSessionErrors: () => dispatch(removeSessionErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
