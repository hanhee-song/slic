export const fetchChannels = (options = { visible: false }) => {
  return $.ajax({
    method: "GET",
    url: `/api/channels`,
    data: { options }
  });
};

export const fetchChannel = (channelId) => {
  return $.ajax({
    method: "GET",
    url: `/api/channels/${channelId}`,
  });
};

export const createChannel = (channel) => {
  return $.ajax({
    method: "POST",
    url: `/api/channels/`,
    data: { channel },
  });
};

const defaultOptions = {
  change_visibility: false,
  visible: true,
};

export const updateChannel = (channel, options = defaultOptions) => {
  debugger;
  return $.ajax({
    method: "PATCH",
    url: `/api/channels/${channel.channel_id}`,
    data: { channel, options },
  });
};

export const deleteChannel = (channelId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/channels/${channelId}`,
  });
};
