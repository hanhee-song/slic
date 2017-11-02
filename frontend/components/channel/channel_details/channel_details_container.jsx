import React from 'react';
import { connect } from 'react-redux';
import ChannelDetails from './channel_details';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: state.entities.channels[ownProps.match.params.channelId] || {},
    
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
