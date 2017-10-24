import { RECEIVE_DROPDOWN, CLEAR_DROPDOWN } from '../actions/ui_actions';

const initialState = {
  dropdown: null,
};

const UIReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  
  switch (action.type) {
    case RECEIVE_DROPDOWN:
      newState = Object.assign({}, state);
      newState.dropdown = action.dropdown;
      return newState;
    case CLEAR_DROPDOWN:
      return null;
    default:
      return state;
  }
};
