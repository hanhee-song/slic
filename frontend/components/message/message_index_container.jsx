import MessageIndex from './message_index';
import { connect } from 'react-redux';
import { fetchMessages } from '../../actions/message_actions';

const mapStateToProps = (state, ownProps) => {
  const channel = state.entities.channels[ownProps.match.params.channelId] || {};
  return {
    messages: state.entities.messages,
    channel: channel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: () => dispatch(fetchMessages()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
