import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL,
} from '../actions/channel_actions';

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
      if (action.channel) {
        newState = merge(newState, { [action.channel.id]: action.channel });
      }
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
