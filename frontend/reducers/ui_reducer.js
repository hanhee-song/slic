import { RECEIVE_DROPDOWN, CLEAR_DROPDOWN } from '../actions/ui_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const initialState = {
  dropdown: null,
};

const UIReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
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
