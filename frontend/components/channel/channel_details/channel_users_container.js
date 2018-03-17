import { connect } from 'react-redux';
import ChannelUsers from './channel_users';
import { withRouter } from 'react-router-dom';
import { receiveDetails } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  const collapsed = !state.ui.details.users;
  const users = channel.users || {};
  return {
    users: Object.values(users) || [],
    currentUser: state.session.currentUser,
    collapsed,
    channel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDetails: (details) => dispatch(receiveDetails(details))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelUsers));
