import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';

const initialState = {
  currentUser: null
};

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = { currentUser: action.currentUser };
      return newState;
    default:
      return state;
  }
  
};

export default SessionReducer;
