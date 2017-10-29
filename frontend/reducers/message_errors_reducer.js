import {
  RECEIVE_ALL_MESSAGES,
  RECEIVE_MESSAGE_ERRORS,
  CLEAR_MESSAGE_ERRORS,
  RECEIVE_MESSAGE,
} from '../actions/message_actions';

const initialState = [];

const MessageErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_MESSAGE_ERRORS:
      return action.errors.responseJSON ?
        action.errors.responseJSON : [action.errors.responseText];
    case RECEIVE_ALL_MESSAGES:
      return initialState;
    case CLEAR_MESSAGE_ERRORS:
      return initialState;
    case RECEIVE_MESSAGE:
      return initialState;
    default:
      return state;
  }
};

export default MessageErrorsReducer;
