import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ErrorsReducer from './errors_reducer';
import ChannelReducer from './channel_reducer';

const RootReducer = combineReducers({
  channels: ChannelReducer,
  session: SessionReducer,
  errors: ErrorsReducer,
});

export default RootReducer;
