import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL,
  RECEIVE_CHANNEL_ERRORS
} from '../actions/channel_actions';

import merge from 'lodash/merge';

const initialState = {};

const ChannelReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  
  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      newState = merge({}, state);
      newState[action.channel.id] = action.channel;
      return newState;
    case REMOVE_CHANNEL:
      newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    default:
      return state;
  }
};

export default ChannelReducer;
