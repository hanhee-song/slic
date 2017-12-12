import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL_ERRORS,
  CLEAR_CHANNEL_ERRORS,
  RECEIVE_CHANNEL,
} from '../actions/channel_actions';

const initialState = [];

const ChannelErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_CHANNEL_ERRORS:
      return action.errors.responseJSON ?
        action.errors.responseJSON : [action.errors.responseText];
    case RECEIVE_ALL_CHANNELS:
    case CLEAR_CHANNEL_ERRORS:
    case RECEIVE_CHANNEL:
      return initialState;
    default:
      return state;
  }
};

export default ChannelErrorsReducer;
