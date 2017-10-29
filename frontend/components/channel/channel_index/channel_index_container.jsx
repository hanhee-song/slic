import { connect } from 'react-redux';
import ChannelIndex from './channel_index';
import { updateChannel } from '../../../actions/channel_actions';
import { receiveDropdown, clearDropdown } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex);
