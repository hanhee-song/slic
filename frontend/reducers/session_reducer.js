import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS,
  RECEIVE_EMAIL,
} from '../actions/session_actions';
import merge from 'lodash/merge';

const initialState = {
  currentUser: null,
  email: null,
};

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState.currentUser = action.currentUser;
      return newState;
    case RECEIVE_EMAIL:
      newState.email = action.email;
      return newState;
    default:
      return state;
  }
  
};

export default SessionReducer;
