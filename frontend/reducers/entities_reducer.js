import { combineReducers } from 'redux';
import ChannelReducer from './channel_reducer';
import MessageReducer from './message_reducer';
import UserReducer from './user_reducer';

const EntitiesReducer = combineReducers({
  channels: ChannelReducer,
  messages: MessageReducer,
  users: UserReducer,
});

export default EntitiesReducer;
