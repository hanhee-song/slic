import ChannelForm from './channel_form';
import { connect } from 'react-redux';
import { createChannel, updateChannel } from '../../../actions/channel_actions';
import { clearDropdown } from '../../../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    errors: state.errors.channel
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
