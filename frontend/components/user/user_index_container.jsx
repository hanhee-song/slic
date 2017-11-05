import { connect } from 'react-redux';
import React from 'react';
import UserIndex from './user_index';
import { fetchUsers } from '../../actions/user_actions';
import { clearDropdown } from '../../actions/ui_actions';
import { createChannel,
  subscribeUserIdsToChannel,
} from '../../actions/channel_actions';

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
    createChannel: (channel, ids) => dispatch(createChannel(channel, ids)),
    subscribeUserIdsToChannel: (channel, ids) => dispatch(subscribeUserIdsToChannel(channel, ids)),
    clearDropdown: () => dispatch(clearDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIndex);
