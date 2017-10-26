export const fetchChannels = (options) => {
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

export const updateChannel = (channel) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/channels/${channel.id}`,
    data: { channel },
  });
};

export const deleteChannel = (channelId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/channels/${channelId}`,
  });
};
