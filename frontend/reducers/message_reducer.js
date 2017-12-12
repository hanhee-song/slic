import {
  RECEIVE_ALL_MESSAGES,
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE,
  CLEAR_MESSAGES,
} from '../actions/message_actions';
import merge from 'lodash/merge';

const initialState = {};

const MessageReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  
  switch (action.type) {
    case RECEIVE_ALL_MESSAGES:
      return action.messages;
    case RECEIVE_MESSAGE:
      newState = merge({}, state, { [action.message.id]: action.message });
      return newState;
    case CLEAR_MESSAGES:
      return initialState;
    default:
      return state;
  }
};

export default MessageReducer;
