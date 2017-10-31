import { connect } from 'react-redux';
import React from 'react';
import UserIndex from './user_index';
import { fetchUsers } from '../../actions/user_actions';
import { clearDropdown } from '../../actions/ui_actions';
import { createChannel, updateChannel } from '../../actions/channel_actions';
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
  const visible = {
    change_visibility: true,
    visible: true,
  };
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    makeChannelVisible: (channel) => dispatch(updateChannel(channel, visible)),
    rememberCurrentChannelId: (user, id) => dispatch(rememberCurrentChannelId(user, id)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIndex);
