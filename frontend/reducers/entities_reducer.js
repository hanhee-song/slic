import { combineReducers } from 'redux';
import ChannelReducer from './channel_reducer';

const EntitiesReducer = combineReducers({
  channels: ChannelReducer
});

export default EntitiesReducer;
