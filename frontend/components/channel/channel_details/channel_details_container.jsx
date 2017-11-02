import React from 'react';
import { connect } from 'react-redux';
import ChannelDetails from './channel_details';

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
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetails);
