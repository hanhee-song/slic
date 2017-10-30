import { connect } from 'react-redux';
import ChannelSidebarItem from './channel_sidebar_item';
import {
  updateChannel,
  setCurrentChannel,
} from '../../../actions/channel_actions';
import { rememberCurrentChannelId } from '../../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel,
    type: ownProps.type,
    selectedChannelId: parseInt(ownProps.selectedChannelId),
  };
};

const mapDispatchToProps = (dispatch) => {
  const options = {
    change_visibility: true,
    visible: false,
  };
  return {
    makeChannelInvisible: (channel) => dispatch(updateChannel(channel, options)),
    rememberCurrentChannelId: (user, channelId) => dispatch(rememberCurrentChannelId(user, channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebarItem);
