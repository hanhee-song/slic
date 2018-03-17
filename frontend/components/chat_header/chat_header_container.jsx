import ChatHeader from './chat_header';
import { connect } from 'react-redux';
import {
  subscribeUserIdsToChannel,
  unsubscribeUserIdsFromChannel,
} from '../../actions/channel_actions';
import {
  receiveDropdown,
  receiveDetails,
  closeDetails,
} from '../../actions/ui_actions';
import { findNextChannelId } from '../../util/find_next_channel_id.js';

const mapStateToProps = (state, ownProps) => {
  let channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    channel: channel,
    currentUser: state.session.currentUser,
    nextChannelId: findNextChannelId(state.entities.channels),
    details: state.ui.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    receiveDetails: (details) => dispatch(receiveDetails(details)),
    closeDetails: () => dispatch(closeDetails()),
    subscribeUserIdsToChannel: (channel, ids) => dispatch(subscribeUserIdsToChannel(channel, ids)),
    unsubscribeUserIdsFromChannel: (channel, ids) => dispatch(unsubscribeUserIdsFromChannel(channel, ids)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHeader);
