import * as ChannelApiUtil from '../util/channel_api_util';

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";
// export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";

export const receiveAllChannels = (channels) => {
  return {
    type: RECEIVE_ALL_CHANNELS,
    channels,
  };
};

export const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel,
  };
};

export const removeChannel = (channelId) => {
  return {
    type: REMOVE_CHANNEL,
    channelId,
  };
};

export const receiveChannelErrors = (errors) => {
  return {
    type: RECEIVE_CHANNEL_ERRORS,
    errors,
  };
};

// export const setCurrentChannel = (channelId) => {
//   return {
//     type: SET_CURRENT_CHANNEL,
//     channelId,
//   };
// };

export const fetchChannels = () => {
  return (dispatch) => {
    return ChannelApiUtil.fetchChannels()
      .then(
        (channels) => dispatch(receiveAllChannels(channels)),
        (errors) => dispatch(receiveChannelErrors(errors))
      );
  };
};

export const fetchChannel = (channelId) => {
  return (dispatch) => {
    return ChannelApiUtil.fetchChannel(channelId)
      .then(
        (channel) => dispatch(receiveChannel(channel)),
        (errors) => dispatch(receiveChannelErrors(errors))
      );
  };
};

export const createChannel = (channel) => {
  return (dispatch) => {
    return ChannelApiUtil.createChannel(channel)
      .then(
        (channel) => dispatch(receiveChannel(channel)),
        (errors) => dispatch(receiveChannelErrors(errors))
      );
  };
};

export const updateChannel = (channel, options) => {
  if (options && options.change_visibility && !options.visible) {
    return (dispatch) => {
      return ChannelApiUtil.updateChannel(channel, options)
      .then(
        () => dispatch(removeChannel(channel.id)),
        (errors) => dispatch(receiveChannelErrors(errors))
      );
    };
    
  } else {
    return (dispatch) => {
      return ChannelApiUtil.updateChannel(channel, options)
      .then(
        (channel) => dispatch(receiveChannel(channel)),
        (errors) => dispatch(receiveChannelErrors(errors))
      );
    };
  }
};

export const deleteChannel = (channelId) => {
  return (dispatch) => {
    return ChannelApiUtil.deleteChannel(channelId)
      .then(
        (channel) => dispatch(receiveChannel(channelId)),
        (errors) => dispatch(receiveChannelErrors(errors))
      );
  };
};
