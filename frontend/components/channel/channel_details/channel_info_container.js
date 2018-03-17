import { connect } from 'react-redux';
import ChannelInfo from './channel_info';
import { withRouter } from 'react-router-dom';
import { receiveDetails } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  const collapsed = !state.ui.details.info;
  return {
    channel,
    collapsed,
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
)(ChannelInfo));
