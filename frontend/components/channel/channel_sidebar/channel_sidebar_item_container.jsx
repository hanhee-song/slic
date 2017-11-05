import { connect } from 'react-redux';
import ChannelSidebarItem from './channel_sidebar_item';
import { makeChannelInvisible } from '../../../actions/channel_actions';
import { findNextChannelId } from '../../../util/find_next_channel_id.js';

const mapStateToProps = (state, ownProps) => {
  return {
    selectedChannelId: parseInt(ownProps.selectedChannelId),
    nextChannelId: findNextChannelId(state.entities.channels),
    details: state.ui.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeChannelInvisible: (channel) => dispatch(makeChannelInvisible(channel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebarItem);
