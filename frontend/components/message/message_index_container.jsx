import MessageIndex from './message_index';
import { connect } from 'react-redux';
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
    fetchMessages: (channelId) => dispatch(fetchMessages(channelId)),
    receiveMessage: (channelId) => dispatch(receiveMessage(channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
