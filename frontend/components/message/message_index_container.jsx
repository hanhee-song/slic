import MessageIndex from './message_index';
import { connect } from 'react-redux';
import { fetchMessages, receiveMessage } from '../../actions/message_actions';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  const messages = Object.values(state.entities.messages).filter(message => {
    return message.channel_id === channel.id;
  });
  return {
    channel: channel,
    messages: messages,
    currentUser: state.session.currentUser,
    currentChannelLoaded: state.ui.currentChannelLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (channelId) => dispatch(fetchMessages(channelId)),
    receiveMessage: (channelId) => dispatch(receiveMessage(channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
