import * as UserApiUtil from './util/user_api_util';
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

// not implemented in reducer yet
export const receiveUserErrors = (errors) => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors,
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    return UserApiUtil.fetchUser(userId)
      .then(
        (user) => dispatch(receiveUser(user)),
        (errors) => dispatch(receiveUserErrors(errors))
      );
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    return UserApiUtil.updateUser(user)
    .then(
      (user) => dispatch(receiveUser(user)),
      (errors) => dispatch(receiveUserErrors(errors))
    );
  };
};
