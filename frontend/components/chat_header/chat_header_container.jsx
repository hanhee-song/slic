import ChatHeader from './chat_header';
import { connect } from 'react-redux';
import { updateChannel } from '../../actions/channel_actions';
import { receiveDropdown } from '../../actions/ui_actions';
import { rememberCurrentChannelId } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  let channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    channels: state.entities.channels,
    channel: channel,
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  // TODO: delegate this responsibility higher up
  // this is a temporary band-aid
  const invisible = {
    change_visibility: true,
    visible: false,
  };
  const visible = {
    change_visibility: true,
    visible: true,
  };
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    makeChannelInvisible: (channel) => dispatch(updateChannel(channel, invisible)),
    makeChannelVisible: (channel) => dispatch(updateChannel(channel, visible)),
    rememberCurrentChannelId: (user, id) => dispatch(rememberCurrentChannelId(user, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHeader);
