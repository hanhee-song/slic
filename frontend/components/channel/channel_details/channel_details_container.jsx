import { connect } from 'react-redux';
import ChannelDetails from './channel_details';
import { closeDetails, receiveDropdown } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    channel: channel,
    currentUser: state.session.currentUser,
    details: state.ui.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDropdown: (dropdown) => dispatch(receiveDropdown(dropdown)),
    closeDetails: () => dispatch(closeDetails()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetails);
