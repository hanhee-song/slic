import { RECEIVE_DROPDOWN, CLEAR_DROPDOWN, UNLOAD_CURRENT_CHANNEL } from '../actions/ui_actions';
import { RECEIVE_DETAILS, CLEAR_DETAILS } from '../actions/ui_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALL_CHANNELS, RECEIVE_CHANNEL } from '../actions/channel_actions';

const initialState = {
  dropdown: null,
  details: "",
  allChannelsLoaded: false,
  currentChannelLoaded: false,
};

const UIReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_DETAILS:
      newState.details = "/details";
      return newState;
    case CLEAR_DETAILS:
      newState.details = "";
      return newState;
    case RECEIVE_DROPDOWN:
      newState.dropdown = action.dropdown;
      return newState;
    case CLEAR_DROPDOWN:
      newState.dropdown = null;
      return newState;
    case RECEIVE_ALL_CHANNELS:
      newState.allChannelsLoaded = true;
      return newState;
    case RECEIVE_CHANNEL:
      newState.currentChannelLoaded = true;
      return newState;
    case UNLOAD_CURRENT_CHANNEL:
      newState.currentChannelLoaded = false;
      return newState;
    default:
      return state;
  }
};

export default UIReducer;
