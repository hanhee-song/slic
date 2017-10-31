import MessageForm from './message_form';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';
import { makeChannelVisible, subscribeUserIdsToChannel } from '../../actions/channel_actions';
import { rememberCurrentChannelId } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (message) => dispatch(createMessage(message)),
    makeChannelVisible: (channel) => dispatch(makeChannelVisible(channel)),
    subscribeUserIdsToChannel: (channel, ids) => dispatch(subscribeUserIdsToChannel(channel, ids)),
    rememberCurrentChannelId: (user, id) => dispatch(rememberCurrentChannelId(user, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
