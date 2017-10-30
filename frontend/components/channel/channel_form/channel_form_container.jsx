import ChannelForm from './channel_form';
import { connect } from 'react-redux';
import {
  createChannel,
  updateChannel,
  clearChannelErrors,
  setCurrentChannel,
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
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    setCurrentChannel: (channel) => dispatch(setCurrentChannel(channel)),
    clearDropdown: () => dispatch(clearDropdown()),
    clearChannelErrors: () => dispatch(clearChannelErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
