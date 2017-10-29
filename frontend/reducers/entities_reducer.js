import { combineReducers } from 'redux';
import ChannelReducer from './channel_reducer';
import MessageReducer from './message_reducer';

const EntitiesReducer = combineReducers({
  channels: ChannelReducer,
  messages: MessageReducer,
});

export default EntitiesReducer;
