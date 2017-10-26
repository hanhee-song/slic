import { connect } from 'react-redux';
import ChannelIndexItem from './channel_index_item';
import { fetchChannel } from '../../actions/channel_actions';
import { clearDropdown } from '../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChannel: (channelId) => dispatch(fetchChannel(channelId)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndexItem);
