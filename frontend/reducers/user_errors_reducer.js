import {
  RECEIVE_ALL_USERS,
  RECEIVE_USER_ERRORS,
  CLEAR_USER_ERRORS,
} from '../actions/user_actions';

const initialState = [];

const UserErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors.responseJSON ?
        action.errors.responseJSON : [action.errors.responseText];
    case RECEIVE_ALL_USERS:
      return initialState;
    case CLEAR_USER_ERRORS:
      return initialState;
    default:
      return state;
  }
};

export default UserErrorsReducer;
