import { connect } from 'react-redux';
import ChannelUsers from './channel_users';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  const users = channel.users || {};
  return {
    users: Object.values(users) || [],
    currentUser: state.session.currentUser,
    channel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelUsers));
