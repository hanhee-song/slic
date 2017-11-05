import ChannelForm from './channel_form';
import { connect } from 'react-redux';
import {
  createChannel,
  subscribeUserIdsToChannel,
  clearChannelErrors,
} from '../../../actions/channel_actions';
import { clearDropdown } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  
  return {
    currentUser: state.session.currentUser,
    errors: state.errors.channel
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: (channel) => dispatch(createChannel(channel)),
    subscribeUserIdsToChannel: (channel, ids) => dispatch(subscribeUserIdsToChannel(channel, ids)),
    clearDropdown: () => dispatch(clearDropdown()),
    clearChannelErrors: () => dispatch(clearChannelErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
