import { RECEIVE_ALL_USERS } from '../actions/user_actions';

import merge from 'lodash/merge';

const initialState = {};

const UserReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return action.users;
    default:
      return state;
  }
};

export default UserReducer;
