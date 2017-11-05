import { connect } from 'react-redux';
import ChannelIndexItem from './channel_index_item';
import { makeChannelVisible } from '../../../actions/channel_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    makeChannelVisible: (channel) => dispatch(makeChannelVisible(channel)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndexItem);
