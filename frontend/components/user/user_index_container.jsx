import { connect } from 'react-redux';
import React from 'react';
import UserIndex from './user_index';
import { fetchUsers } from '../../actions/user_actions';
import { clearDropdown } from '../../actions/ui_actions';
import { createChannel,
  subscribeUserIdsToChannel,
  makeChannelVisible
} from '../../actions/channel_actions';
import { rememberCurrentChannelId } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    users: state.entities.users,
    dropdown: state.ui.dropdown,
    channel: state.entities.channels[ownProps.match.params.channelId] || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    subscribeUserIdsToChannel: (channel, ids) => dispatch(subscribeUserIdsToChannel(channel, ids)),
    makeChannelVisible: (channel) => dispatch(makeChannelVisible(channel)),
    rememberCurrentChannelId: (user, id) => dispatch(rememberCurrentChannelId(user, id)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIndex);
