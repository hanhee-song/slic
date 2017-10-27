import ChatHeader from './chat_header';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  let channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    channel: channel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHeader);
