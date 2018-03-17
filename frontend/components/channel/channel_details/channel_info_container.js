import { connect } from 'react-redux';
import ChannelInfo from './channel_info';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    channel
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelInfo));
