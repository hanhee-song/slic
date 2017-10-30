import Workspace from './workspace';
import { connect } from 'react-redux';
import { receiveDropdown, clearDropdown } from '../../actions/ui_actions';
import { fetchChannels, setCurrentChannel } from '../../actions/channel_actions';
import { rememberCurrentChannelId } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    dropdown: state.ui.dropdown,
    currentChannelId: state.ui.currentChannelId,
    channels: state.entities.channels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    clearDropdown: () => dispatch(clearDropdown()),
    fetchChannels: () => dispatch(fetchChannels()),
    rememberCurrentChannelId: (user, channelId) => dispatch(rememberCurrentChannelId(user, channelId)),
    setCurrentChannel: (channelId) => dispatch(setCurrentChannel(channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
