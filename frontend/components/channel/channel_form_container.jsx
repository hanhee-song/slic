import ChannelForm from './channel_form';
import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: () => dispatch(createChannel()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
