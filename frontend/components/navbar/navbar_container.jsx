import Navbar from './navbar';
import { connect } from 'react-redux';

// TEMP
import { logout } from '../../actions/session_actions';
//

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  };
};

// TEMP
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps // TEMP
)(Navbar);
