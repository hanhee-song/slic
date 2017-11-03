import MessageIndex from './message_index';
import { connect } from 'react-redux';
// import { fetchChannel } from '../../actions/channel_actions';
import { fetchMessages, receiveMessage } from '../../actions/message_actions';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    channel: channel,
    messages: Object.values(state.entities.messages) || [],
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    fetchMessages: (channelId) => dispatch(fetchMessages(channelId)),
    receiveMessage: (channelId) => dispatch(receiveMessage(channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
