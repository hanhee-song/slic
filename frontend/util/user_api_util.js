export const signup = (user) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user },
  });
};
