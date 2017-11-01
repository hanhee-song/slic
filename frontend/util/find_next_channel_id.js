export const findNextChannelId = (channels) => {
  const nextChannel = Object.values(channels)
    .filter((channel) => {
      return channel.subscribed === true;
    })[0];
  let nextChannelId;
  if (nextChannel) {
    nextChannelId = nextChannel.id;
  }
  return nextChannelId;
};
