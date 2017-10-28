import ChatHeader from './chat_header';
import { connect } from 'react-redux';
import { rememberCurrentChannelId } from '../../actions/session_actions';
import { updateChannel } from '../../actions/channel_actions';
  
const mapStateToProps = (state, ownProps) => {
  let channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    channel: channel,
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  // TODO: delegate this responsibility higher up
  // this is a temporary band-aid
  const options = {
    change_visibility: true,
    visible: false,
  };
  return {
    makeChannelInvisible: (channel) => dispatch(updateChannel(channel, options)),
    rememberCurrentChannelId: (user, channelId) => dispatch(rememberCurrentChannelId(user, channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHeader);
