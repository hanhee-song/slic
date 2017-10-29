import Workspace from './workspace';
import { connect } from 'react-redux';
import { receiveDropdown, clearDropdown } from '../../actions/ui_actions';
import { fetchChannels } from '../../actions/channel_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    clearDropdown: () => dispatch(clearDropdown()),
    fetchChannels: () => dispatch(fetchChannels()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
