import { connect } from 'react-redux';
import ChannelIndex from './channel_index';
import { fetchChannels } from '../../actions/channel_actions';
import { receiveDropdown } from '../../actions/receive_dropdown';

const mapStateToProps = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchChannels: () => dispatch(fetchChannels()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex);
