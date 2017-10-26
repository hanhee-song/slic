import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import ChannelErrorsReducer from './channel_errors_reducer';

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  channel: ChannelErrorsReducer,
});

export default ErrorsReducer;
