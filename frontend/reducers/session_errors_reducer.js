import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS,
  REMOVE_SESSION_ERRORS
} from '../actions/session_actions';

const initialState = [];

const SessionErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors.responseJSON ?
        action.errors.responseJSON : [action.errors.responseText];
    case RECEIVE_CURRENT_USER:
    case REMOVE_SESSION_ERRORS:
      return initialState;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
