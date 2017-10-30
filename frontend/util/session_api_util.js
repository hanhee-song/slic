export const signup = (user) => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user },
  });
};

export const login = (user) => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user },
  });
};

export const logout = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session",
  });
};

const defaultUpdate = {
  channelId: null
};

export const updateUser = (user, channelId = null) => {
  debugger;
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user: Object.assign(
      {},
      user,
      { most_recent_channel_id: channelId}
    ) },
  });
};
