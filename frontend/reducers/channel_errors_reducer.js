import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL_ERRORS,
  CLEAR_CHANNEL_ERRORS,
} from '../actions/channel_actions';

const initialState = [];

const SessionErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_CHANNEL_ERRORS:
      return action.errors.responseJSON ?
        action.errors.responseJSON : [action.errors.responseText];
    case RECEIVE_ALL_CHANNELS:
      return initialState;
    case CLEAR_CHANNEL_ERRORS:
      return initialState;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
