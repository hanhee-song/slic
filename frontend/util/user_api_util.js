export const fetchUsers = () => {
  debugger;
  return $.ajax({
    method: "GET",
    url: `/api/users`,
  });
};
