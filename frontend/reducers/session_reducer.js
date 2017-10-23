import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS,
  RECEIVE_EMAIL,
} from '../actions/session_actions';

const initialState = {
  currentUser: null,
  email: null,
};

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = Object.assign({}, state);
      newState.currentUser = action.currentUser;
      return newState;
    case RECEIVE_EMAIL:
      newState = Object.assign({}, state);
      newState.email = action.email;
      return newState;
    default:
      return state;
  }
  
};

export default SessionReducer;
