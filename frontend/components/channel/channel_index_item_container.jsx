import { connect } from 'react-redux';
import ChannelIndexItem from './channel_index_item';
import { fetchChannel } from '../../actions/channel_actions';
import { clearDropdown } from '../../actions/ui_actions';


const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.channel.id];
  const users = channel.users ? Object.keys(channel.users) : [];
  
  return {
    channelId: ownProps.channel.id,
    channel: channel,
    users: users,
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
