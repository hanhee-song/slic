import React from 'react';
import { connect } from 'react-redux';
import ChannelDetails from './channel_details';
import { clearDetails, receiveDropdown } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  const users = channel.users || {};
  return {
    channel: channel,
    users: Object.values(users) || [],
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    clearDetails: () => dispatch(clearDetails()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetails);
