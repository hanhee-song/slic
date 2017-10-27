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

export const updateUser = (user, options = defaultUpdate) => {
  const channel_id = options.channelId || options.most_recent_channel_id;
  const rename = { most_recent_channel_id: channel_id };
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user: Object.assign({}, user, rename) },
  });
};
