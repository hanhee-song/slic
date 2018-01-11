export const RECEIVE_DROPDOWN = "RECEIVE_DROPDOWN";
export const CLEAR_DROPDOWN = "CLEAR_DROPDOWN";
export const RECEIVE_DETAILS = "RECEIVE_DETAILS";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const UNLOAD_CURRENT_CHANNEL = "UNLOAD_CURRENT_CHANNEL";

export const receiveDropdown = (dropdown) => {
  return {
    type: RECEIVE_DROPDOWN,
    dropdown,
  };
};

export const clearDropdown = () => {
  return {
    type: CLEAR_DROPDOWN,
  };
};

export const receiveDetails = () => {
  return {
    type: RECEIVE_DETAILS,
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

export const unloadCurrentChannel = () => {
  return {
    type: UNLOAD_CURRENT_CHANNEL,
  };
};
