import { connect } from 'react-redux';
import ChannelSidebar from './channel_sidebar';
import { updateChannel } from '../../../actions/channel_actions';
import { receiveDropdown } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
    dropdown: state.ui.dropdown,
    selectedChannelId: ownProps.match.params.channelId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateChannel: (channel) => dispatch(updateChannel(channel)),
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebar);
