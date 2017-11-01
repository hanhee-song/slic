import { connect } from 'react-redux';
import ChannelIndex from './channel_index';
import { clearDropdown } from '../../../actions/ui_actions';
import { makeChannelVisible } from '../../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
    dropdown: state.ui.dropdown,
    currentUser: state.entities.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearDropdown: () => dispatch(clearDropdown()),
    makeChannelVisible: (channel) => dispatch(makeChannelVisible(channel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex);
