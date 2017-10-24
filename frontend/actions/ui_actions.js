export const RECEIVE_DROPDOWN = "RECEIVE_DROPDOWN";
export const CLEAR_DROPDOWN = "CLEAR_DROPDOWN";

export const receiveDropdown = (dropdown) => {
  return {
    type: RECEIVE_DROPDOWN,
    dropdown,
  };
};

export const clearDropdown = () => {
  return {
    type: RECEIVE_DROPDOWN,
  };
};
