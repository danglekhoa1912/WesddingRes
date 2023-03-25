import {createSlice} from '@reduxjs/toolkit';
import {ILobby} from '../../type/lobby';
import {reducer} from './reducer';

export interface ILobbyStore {
  lobby: ILobby;
}

const initialState = {
  lobby: {
    capacity: 0,
    describe: '',
    id: 0,
    image: '',
    name: '',
    price: 0,
    status: '',
  },
} as ILobbyStore;

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: reducer,
  // extraReducers:''
});

export const {} = lobbySlice.actions;

export default lobbySlice.reducer;
