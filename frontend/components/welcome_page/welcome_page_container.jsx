import { connect } from 'react-redux';
import WelcomePage from './welcome_page';
import { receiveEmail } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  let email = state.session.email ? state.session.email : "";
  return {
    email: email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveEmail: (email) => dispatch(receiveEmail(email)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
