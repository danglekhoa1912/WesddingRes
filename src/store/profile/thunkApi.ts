import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {IUserStore} from '.';
import {UserApi} from '../../apis';
import {ILoginRes, IUser} from '../../type/user';
import {saveStorage} from '../../utils/storage';
import {withParamsToastCatcher} from '../ToastCatcher';
import {ISearchParam} from '../../type/common';
import {Platform} from 'react-native';

export const loginUser = createAsyncThunk(
  'profile/login',
  withParamsToastCatcher(async (data: ILoginRes) => {
    return await UserApi.login(data);
    // return result.data;
  }, 'Login successfully'),
);

export const loginUserWeb = createAsyncThunk(
  'profile/loginWeb',
  async (data: ILoginRes) => {
    return await UserApi.login(data);
    // return result.data;
  },
);

export const registerUser = createAsyncThunk(
  'profile/register',
  withParamsToastCatcher(async (user: IUser) => {
    const result = await UserApi.register(user);
    return result;
  }, 'Register successfully'),
);

export const getUser = createAsyncThunk('profile/getUser', async () => {
  const result = await UserApi.getUser();
  return result.data;
});

export const getAllUser = createAsyncThunk(
  'profile/getAllUser',
  async (params: ISearchParam) => {
    const result = await UserApi.getAllUser(params);
    return result.data;
  },
);

export const getUserById = createAsyncThunk(
  'profile/getUserById',
  async (id: number) => {
    const result = await UserApi.getUserById(id);
    return result.data;
  },
);

export const getOrderHistory = createAsyncThunk(
  'profile/getOrderHistory',
  async (param: ISearchParam) => {
    const result = await UserApi.getOrderHistory(param);
    return result;
  },
);

export const getOrderHistoryById = createAsyncThunk(
  'profile/getOrderHistoryById',
  async (id: number) => {
    const result = await UserApi.getOrderHistoryById(id);
    return result.data;
  },
);

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  withParamsToastCatcher(async (user: IUser) => {
    const result = await UserApi.updateUser(user);
    return result.data;
  }, 'Update successfully'),
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IUserStore>,
) => {
  builders.addCase(
    loginUser.fulfilled,
    (state: IUserStore, action: PayloadAction<any>) => {
      saveStorage('accessToken', action.payload.data.accessToken);
    },
  );

  builders.addCase(
    getUser.fulfilled,
    (state: IUserStore, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  );
};
