import { connect } from 'react-redux';
import SessionForm from './session_form';
import {
  signup,
  login,
  removeSessionErrors,
} from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  const formType = ownProps.location.pathname;
  const email = state.session.email || "";
  return {
    formType: formType,
    email: email,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const submitForm = ownProps.location.pathname === '/signup' ?
    signup : login;
  
  return {
    submitForm: (user) => dispatch(submitForm(user)),
    removeSessionErrors: () => dispatch(removeSessionErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
