import { connect } from 'react-redux';
import React from 'react';
import UserIndex from './user_index';
import { fetchUsers } from '../../actions/user_actions';
import { clearDropdown } from '../../actions/ui_actions';
import { updateChannel } from '../../actions/channel_actions';

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
    clearDropdown: () => dispatch(clearDropdown()),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    makeChannelVisible: (channel) => dispatch(updateChannel(channel, visible)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIndex);
