import ChannelForm from './channel_form';
import { connect } from 'react-redux';
import {
  createChannel,
  updateChannel,
  clearChannelErrors,
} from '../../../actions/channel_actions';
import { clearDropdown } from '../../../actions/ui_actions';
import { rememberCurrentChannelId } from '../../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  
  return {
    currentUser: state.session.currentUser,
    errors: state.errors.channel
  };
};

const mapDispatchToProps = (dispatch) => {
  const visible = {
    change_visibility: true,
    visible: true,
  };
  return {
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    makeChannelVisible: (channel) => dispatch(updateChannel(channel, visible)),
    rememberCurrentChannelId: (user, id) => dispatch(rememberCurrentChannelId(user, id)),
    clearDropdown: () => dispatch(clearDropdown()),
    clearChannelErrors: () => dispatch(clearChannelErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
