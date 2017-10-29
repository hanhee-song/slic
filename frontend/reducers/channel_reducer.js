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
      return action.channels;
    case RECEIVE_CHANNEL:
      // There's some back-end debt being paid here...
      newState = merge({}, state, { [action.channel.id]: action.channel });
      const updatedChannel = merge({}, state[action.channel.id], action.channel);
      newState[action.channel.id] = updatedChannel;
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
