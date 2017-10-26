import { connect } from 'react-redux';
import ChannelIndexItem from './channel_index_item';

const mapStateToProps = (state, ownProps) => {
  return {
    channel: ownProps.channel
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndexItem);
