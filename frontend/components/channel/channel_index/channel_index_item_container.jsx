import { connect } from 'react-redux';
import ChannelIndexItem from './channel_index_item';
import { clearDropdown } from '../../../actions/ui_actions';
import { makeChannelVisible } from '../../../actions/channel_actions';
 import { rememberCurrentChannelId } from '../../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clearDropdown: () => dispatch(clearDropdown()),
    makeChannelVisible: (channel) => dispatch(makeChannelVisible(channel)),
    rememberCurrentChannelId: (user, channelId) => dispatch(rememberCurrentChannelId(user, channelId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndexItem);
