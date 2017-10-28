import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_EMAIL = "RECEIVE_EMAIL";
export const REMOVE_SESSION_ERRORS = "REMOVE_SESSION_ERRORS";

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

export const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

export const receiveEmail = (email) => {
  return {
    type: RECEIVE_EMAIL,
    email,
  };
};

export const removeSessionErrors = () => {
  return {
    type: REMOVE_SESSION_ERRORS,
  };
};

export const signup = (user) => {
  return (dispatch) => {
    return SessionApiUtil.signup(user)
      .then(
        (user) => dispatch(receiveCurrentUser(user)),
        (errors) => dispatch(receiveSessionErrors(errors))
      );
  };
};

export const login = (user) => {
  return (dispatch) => {
    return SessionApiUtil.login(user)
      .then(
        (user) => dispatch(receiveCurrentUser(user)),
        (errors) => dispatch(receiveSessionErrors(errors))
      );
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionApiUtil.logout()
      .then(
        () => dispatch(receiveCurrentUser(null)),
        (errors) => dispatch(receiveSessionErrors(errors))
      );
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    return SessionApiUtil.updateUser(user)
      .then(
        (user) => dispatch(receiveCurrentUser(user)),
        (errors) => dispatch(receiveSessionErrors(errors))
      );
  };
};

export const rememberCurrentChannelId = (user, channelId) => {
  return (dispatch) => {
    return SessionApiUtil.updateUser(user, channelId)
      .then(
        (user) => dispatch(receiveCurrentUser(user)),
        (errors) => dispatch(receiveSessionErrors(errors))
      );
  };
};

// Make a util to choose the first channel Id in the list that's not
// channelId
//
// export const newCurrentChannelId = (user, channels, channelId) => {
//   return (dispatch) => {
//     return SessionApiUtil.updateUser(user, channelId)
//       .then(
//         (user) => dispatch(receiveCurrentUser(user)),
//         (errors) => dispatch(receiveSessionErrors(errors))
//       );
//   };
// };
