import { connect } from 'react-redux';
import ChannelSidebarItem from './channel_sidebar_item';
import {
  updateChannel,
  setCurrentChannel
} from '../../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  debugger;
  return {
    channel: ownProps.channel,
  };
};

const mapDispatchToProps = (dispatch) => {
  const options = {
    change_visibility: true,
    visible: false,
  };
  return {
    makeChannelInvisible: (channel) => dispatch(updateChannel(channel, options)),
    setCurrentChannel: (channelId) => dispatch(setCurrentChannel(channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebarItem);
