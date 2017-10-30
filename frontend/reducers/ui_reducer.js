import { RECEIVE_DROPDOWN, CLEAR_DROPDOWN } from '../actions/ui_actions';

import { SET_CURRENT_CHANNEL } from '../actions/channel_actions';

const initialState = {
  dropdown: null,
  currentChannelId: null,
};

const UIReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      newState.currentChannelId = action.channelId;
      return newState;
    case RECEIVE_DROPDOWN:
      newState.dropdown = action.dropdown;
      return newState;
    case CLEAR_DROPDOWN:
      newState.dropdown = null;
      return newState;
    default:
      return state;
  }
};

export default UIReducer;
