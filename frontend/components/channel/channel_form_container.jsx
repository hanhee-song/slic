import ChannelForm from './channel_form';
import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';
import { clearDropdown } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: (channel) => dispatch(createChannel(channel)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
