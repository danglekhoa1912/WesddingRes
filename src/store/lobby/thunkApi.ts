import {ILobbyStore} from './index';
import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';
import {LobbyApi} from '../../apis';
import {ILobbyRes} from '../../type/lobby';

export const getLobbyById = createAsyncThunk(
  'lobby/getLobbyById',
  async (id: number) => {
    const result = await LobbyApi.getLobbyById(id);
    return result;
  },
);

export const addLooby = createAsyncThunk(
  'lobby/addLooby',
  async (lobby: ILobbyRes) => {
    const result = await LobbyApi.addLooby(lobby);
    return result;
  },
);

export const getLobbyList = createAsyncThunk('lobby/getLobbyList', async () => {
  const result = await LobbyApi.getLobbyList();
  return result;
});

export const updateLobby = createAsyncThunk(
  'lobby/updateLobby',
  async (lobby: ILobbyRes) => {
    const result = await LobbyApi.updateLobby(lobby);
    return result;
  },
);

export const deleteLobby = createAsyncThunk(
  'lobby/deleteLobby',
  async (id: number) => {
    const result = await LobbyApi.deleteLobby(id);
    return result;
  },
);
export const extraReducers = (
  builders: ActionReducerMapBuilder<ILobbyStore>,
) => {};
