import {
  RECEIVE_ALL_MESSAGES,
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE,
} from '../actions/message_actions';
import { RECEIVE_CHANNEL } from '../actions/channel_actions';

import merge from 'lodash/merge';

const initialState = {};

const MessageReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  
  switch (action.type) {
    case RECEIVE_ALL_MESSAGES:
      return action.messages;
    // case RECEIVE_CHANNEL:
      // action.channel.messages returns undefined when a channel has no messages
      // darn jbuilder sending up no empty object
      // const actionMessages = action.channel.messages || {};
      // return merge({}, state, actionMessages);
      // return action.channel.messages || {};
    case RECEIVE_MESSAGE:
      newState = merge({}, state, { [action.message.id]: action.message });
      return newState;
    // case REMOVE_MESSAGE:
    //   newState = merge({}, state);
    //   delete newState[action.messageId];
    //   return newState;
    default:
      return state;
  }
};

export default MessageReducer;
