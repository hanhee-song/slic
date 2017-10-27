import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS,
  RECEIVE_EMAIL,
} from '../actions/session_actions';
import { SET_CURRENT_CHANNEL } from '../actions/channel_actions';

const initialState = {
  currentUser: null,
  email: null,
  currentChannelId: null,
};

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState.currentUser = action.currentUser;
      return newState;
    case RECEIVE_EMAIL:
      newState.email = action.email;
      return newState;
    case SET_CURRENT_CHANNEL:
      newState.currentChannelId = action.currentChannelId;
      return newState;
    default:
      return state;
  }
  
};

export default SessionReducer;
