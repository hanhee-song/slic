import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

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

export const signup = (user) => {
  return (dispatch) => {
    return SessionApiUtil.signup(user)
      .then(
        (user) => receiveCurrentUser(user),
        (errors) => receiveSessionErrors(errors)
      );
  };
};

export const login = (user) => {
  return (dispatch) => {
    return SessionApiUtil.login(user)
      .then(
        (user) => receiveCurrentUser(user),
        (errors) => receiveSessionErrors(errors)
      );
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionApiUtil.logout()
      .then(
        () => receiveCurrentUser(null),
        (errors) => receiveSessionErrors(errors)
      );
  };
};
