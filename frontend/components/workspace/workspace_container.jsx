import Workspace from './workspace';
import { connect } from 'react-redux';
import { receiveDetails } from '../../actions/ui_actions';
import { fetchChannels, fetchChannel, clearChannelErrors } from '../../actions/channel_actions';
import { rememberCurrentChannelId } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    dropdown: state.ui.dropdown,
    details: state.ui.details,
    channels: state.entities.channels,
    channelErrors: state.errors.channel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDetails: () => dispatch(receiveDetails()),
    fetchChannels: () => dispatch(fetchChannels()),
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    clearChannelErrors: () => dispatch(clearChannelErrors()),
    rememberCurrentChannelId: (user, channelId) => dispatch(rememberCurrentChannelId(user, channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
