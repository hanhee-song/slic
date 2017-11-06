import * as UserApiUtil from '../util/user_api_util';
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
// export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS";

export const receiveAllUsers = (users) => {
  return {
    type: RECEIVE_ALL_USERS,
    users,
  };
};

export const receiveUserErrors = (errors) => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors,
  };
};

export const clearUserErrors = () => {
  return {
    type: CLEAR_USER_ERRORS,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    return UserApiUtil.fetchUsers()
      .then(
        (user) => dispatch(receiveAllUsers(user)),
        (errors) => dispatch(receiveUserErrors(errors))
      );
  };
};
