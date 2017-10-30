import MessageForm from './message_form';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';
import { updateChannel } from '../../actions/channel_actions';
import { rememberCurrentChannelId } from '../../actions/session_actions';
const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  const visible = {
    change_visibility: true,
    visible: true,
  };
  return {
    createMessage: (message) => dispatch(createMessage(message)),
    makeChannelVisible: (channel) => dispatch(updateChannel(channel, visible)),
    rememberCurrentChannelId: (user, id) => dispatch(rememberCurrentChannelId(user, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
