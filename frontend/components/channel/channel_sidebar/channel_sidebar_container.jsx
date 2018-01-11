import { connect } from 'react-redux';
import ChannelSidebar from './channel_sidebar';
import { receiveDropdown } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels),
    selectedChannelId: ownProps.match.params.channelId,
    allChannelsLoaded: state.ui.allChannelsLoaded,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebar);
