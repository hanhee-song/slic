export const fetchChannels = () => {
  return $.ajax({
    method: "GET",
    url: `/api/channels`,
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
  return $.ajax({
    method: "PATCH",
    url: `/api/channels/${channel.id}`,
    data: { channel, options },
  });
};

export const deleteChannel = (channelId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/channels/${channelId}`,
  });
};
