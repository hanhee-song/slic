import { connect } from 'react-redux';
import ChannelSidebarItem from './channel_sidebar_item';
import { makeChannelInvisible } from '../../../actions/channel_actions';
import { rememberCurrentChannelId } from '../../../actions/session_actions';
import { findNextChannelId } from '../../../util/find_next_channel_id.js';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel,
    type: ownProps.type,
    selectedChannelId: parseInt(ownProps.selectedChannelId),
    currentUser: state.session.currentUser,
    nextChannelId: findNextChannelId(state.entities.channels),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeChannelInvisible: (channel) => dispatch(makeChannelInvisible(channel)),
    rememberCurrentChannelId: (user, channelId) => dispatch(rememberCurrentChannelId(user, channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebarItem);
