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

// export const receiveUser = (user) => {
//   return {
//     type: RECEIVE_USER,
//     user,
//   };
// };

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

// export const fetchUser = (userId) => {
//   return (dispatch) => {
//     return UserApiUtil.fetchUser(userId)
//       .then(
//         (user) => dispatch(receiveUser(user)),
//         (errors) => dispatch(receiveUserErrors(errors))
//       );
//   };
// };
//
// export const updateUser = (user) => {
//   return (dispatch) => {
//     return UserApiUtil.updateUser(user)
//       .then(
//         (user) => dispatch(receiveUser(user)),
//         (errors) => dispatch(receiveUserErrors(errors))
//       );
//   };
// };
