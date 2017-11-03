export const fetchMessages = (channelId) => {
  return $.ajax({
    method: "GET",
    url: `/api/channels/${channelId}/messages`,
  });
};

export const fetchMessage = (messageId) => {
  return $.ajax({
    method: "GET",
    url: `/api/messages/${messageId}`,
  });
};

export const createMessage = (message) => {
  return $.ajax({
    method: "POST",
    url: `/api/messages`,
    data: { message },
  });
};
