import ChatHeader from './chat_header';
import { connect } from 'react-redux';
import {
  makeChannelInvisible,
  makeChannelVisible,
  subscribeUserIdsToChannel,
  unsubscribeUserIdsFromChannel,
} from '../../actions/channel_actions';
import {
  receiveDropdown,
  receiveDetails,
  clearDetails,
} from '../../actions/ui_actions';
import { rememberCurrentChannelId } from '../../actions/session_actions';
import { findNextChannelId } from '../../util/find_next_channel_id.js';

const mapStateToProps = (state, ownProps) => {
  let channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    channel: channel,
    currentUser: state.session.currentUser,
    nextChannelId: findNextChannelId(state.entities.channels),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    receiveDetails: () => dispatch(receiveDetails()),
    clearDetails: () => dispatch(clearDetails()),
    makeChannelInvisible: (channel) => dispatch(makeChannelInvisible(channel)),
    makeChannelVisible: (channel) => dispatch(makeChannelVisible(channel)),
    rememberCurrentChannelId: (user, id) => dispatch(rememberCurrentChannelId(user, id)),
    subscribeUserIdsToChannel: (channel, ids) => dispatch(subscribeUserIdsToChannel(channel, ids)),
    unsubscribeUserIdsFromChannel: (channel, ids) => dispatch(unsubscribeUserIdsFromChannel(channel, ids)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHeader);
