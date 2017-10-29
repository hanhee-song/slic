import MessageForm from './message_form';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: (message) => dispatch(createMessage(message)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);
