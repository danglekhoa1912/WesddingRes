import {combineReducers} from 'redux';
import user from './user';
import globalSlice from './global';
import lobbySlice from './lobby';
import dishSlice from './dish';
import serviceSlice from './service';
import bookingSlice from './booking';

const rootReducer = combineReducers({
  global: globalSlice,
  user: user,
  lobby: lobbySlice,
  dish: dishSlice,
  service: serviceSlice,
  booking: bookingSlice,
});

export default rootReducer;
