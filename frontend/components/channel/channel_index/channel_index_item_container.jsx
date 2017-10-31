import { connect } from 'react-redux';
import ChannelIndexItem from './channel_index_item';
import { makeChannelVisible } from '../../../actions/channel_actions';
import { clearDropdown } from '../../../actions/ui_actions';


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
    clearDropdown: () => dispatch(clearDropdown()),
    makeChannelVisible: (channel) => dispatch(makeChannelVisible(channel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndexItem);
