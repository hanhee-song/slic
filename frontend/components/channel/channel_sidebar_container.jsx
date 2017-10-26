import { connect } from 'react-redux';
import ChannelSidebar from './channel_sidebar';
import { fetchChannels, updateChannel } from '../../actions/channel_actions';
import { receiveDropdown } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchChannels: (options) => dispatch(fetchChannels(options)),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebar);
