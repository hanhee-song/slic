import { connect } from 'react-redux';
import ChannelSidebar from './channel_sidebar';
import {
  fetchChannels,
  updateChannel,
  makeChannelInvisible } from '../../../actions/channel_actions';
import { receiveDropdown } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchChannels: () => dispatch(fetchChannels()),
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    makeChannelInvisible: (channel) => dispatch(makeChannelInvisible(channel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebar);
