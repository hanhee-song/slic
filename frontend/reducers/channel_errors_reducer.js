import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL_ERRORS,
} from '../actions/channel_actions';

const initialState = [];

const SessionErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_CHANNEL_ERRORS:
      debugger;
      return action.errors.responseJSON;
    case RECEIVE_ALL_CHANNELS:
      return initialState;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
