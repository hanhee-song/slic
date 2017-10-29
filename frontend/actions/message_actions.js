import * as MessageApiUtil from '../util/message_api_util';

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";
export const CLEAR_MESSAGE_ERRORS = "CLEAR_MESSAGE_ERRORS";

export const receiveAllMessages = (messages) => {
  return {
    type: RECEIVE_ALL_MESSAGES,
    messages,
  };
};

export const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
};

export const removeMessage = (messageId) => {
  return {
    type: REMOVE_MESSAGE,
    messageId,
  };
};

export const receiveMessageErrors = (errors) => {
  return {
    type: RECEIVE_MESSAGE_ERRORS,
    errors,
  };
};

export const clearMessageErrors = () => {
  return {
    type: CLEAR_MESSAGE_ERRORS,
  };
};


export const fetchMessages = () => {
  return (dispatch) => {
    return MessageApiUtil.fetchMessages()
      .then(
        (messages) => dispatch(receiveAllMessages(messages)),
        (errors) => dispatch(receiveMessageErrors(errors))
      );
  };
};

export const fetchMessage = (messageId) => {
  return (dispatch) => {
    return MessageApiUtil.fetchMessage(messageId)
      .then(
        (message) => dispatch(receiveMessage(message)),
        (errors) => dispatch(receiveMessageErrors(errors))
      );
  };
};

export const createMessage = (message) => {
  return (dispatch) => {
    return MessageApiUtil.createMessage(message)
      .then(
        (message) => dispatch(receiveMessage(message)),
        (errors) => dispatch(receiveMessageErrors(errors))
      );
  };
};

export const deleteMessage = (messageId) => {
  return (dispatch) => {
    return MessageApiUtil.deleteMessage(messageId)
      .then(
        (message) => dispatch(receiveMessage(messageId)),
        (errors) => dispatch(receiveMessageErrors(errors))
      );
  };
};
