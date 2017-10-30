import ChatHeader from './chat_header';
import { connect } from 'react-redux';
import { updateChannel } from '../../actions/channel_actions';
import { receiveDropdown } from '../../actions/ui_actions';

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
  const options = {
    change_visibility: true,
    visible: false,
  };
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    makeChannelInvisible: (channel) => dispatch(updateChannel(channel, options)),
    // setCurrentChannel: (channel) => dispatch(setCurrentChannel(channel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHeader);
