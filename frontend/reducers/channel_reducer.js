import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL,
  CLEAR_CHANNELS,
} from '../actions/channel_actions';
import { RECEIVE_MESSAGE } from '../actions/message_actions';
import merge from 'lodash/merge';

const initialState = {};

const ChannelReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  
  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      return merge({}, state, action.channels);
    case RECEIVE_CHANNEL:
      newState = merge({}, state);
      newState[action.channel.id] = action.channel;
      return newState;
    case REMOVE_CHANNEL:
      newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    case CLEAR_CHANNELS:
      return initialState;
    case RECEIVE_MESSAGE:
      newState = merge({}, state);
      newState[action.message.channel_id].most_recent_activity = action.message.created_at;
      return newState;
    default:
      return state;
  }
};

export default ChannelReducer;
