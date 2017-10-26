import { connect } from 'react-redux';
import ChannelSidebarItem from './channel_sidebar_item';
import { updateChannel } from '../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeChannelInvisible: (channel) => dispatch(updateChannel(channel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSidebarItem);
