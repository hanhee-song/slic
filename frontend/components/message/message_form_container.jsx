import MessageForm from './message_form';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';
import { subscribeUserIdsToChannel } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (message) => dispatch(createMessage(message)),
    subscribeUserIdsToChannel: (channel, ids) => dispatch(subscribeUserIdsToChannel(channel, ids)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
