import * as ChannelApiUtil from '../util/channel_api_util';

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";

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

export const fetchChannels = (options) => {
  return (dispatch) => {
    return ChannelApiUtil.fetchChannels(options)
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

export const updateChannel = (channel) => {
  return (dispatch) => {
    return ChannelApiUtil.updateChannel(channel)
      .then(
        (channel) => dispatch(receiveChannel(channel)),
        (errors) => dispatch(receiveChannelErrors(errors))
      );
  };
};
// 
// export const makeChannelInvisible = (channel) => {
//   let nextChannel = channel;
//   nextChannel.change_visibility = true;
//   nextChannel.visible = false;
//   return (dispatch) => {
//     return ChannelApiUtil.updateChannel(nextChannel)
//       .then(
//         (channel) => dispatch(receiveChannel(channel)),
//         (errors) => dispatch(receiveChannelErrors(errors))
//       );
//   };
// };
//
// export const makeChannelVisible = (channel) => {
//   let nextChannel = channel;
//   nextChannel.change_visibility = true;
//   nextChannel.visible = true;
//   return (dispatch) => {
//     return ChannelApiUtil.updateChannel(nextChannel)
//       .then(
//         (channel) => dispatch(receiveChannel(channel)),
//         (errors) => dispatch(receiveChannelErrors(errors))
//       );
//   };
// };

export const deleteChannel = (channelId) => {
  return (dispatch) => {
    return ChannelApiUtil.deleteChannel(channelId)
      .then(
        (channel) => dispatch(receiveChannel(channelId)),
        (errors) => dispatch(receiveChannelErrors(errors))
      );
  };
};
