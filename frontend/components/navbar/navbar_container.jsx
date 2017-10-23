import Navbar from './navbar';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
