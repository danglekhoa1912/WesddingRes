import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {IUserStore} from '.';
import {UserApi} from '../../apis';
import {ILoginRes, IUser} from '../../type/user';
import {saveStorage} from '../../utils/storage';

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: ILoginRes) => {
    const result = await UserApi.login(data);
    return result.data;
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: IUser) => {
    const result = await UserApi.register(user);
    return result;
  },
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const result = await UserApi.getUser();
  console.log(result);
  return result.data;
});

export const getOrderHistory = createAsyncThunk(
  'user/getOrderHistory',
  async (userId: number) => {
    const result = await UserApi.getOrderHistory(userId);
    return result;
  },
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IUserStore>,
) => {
  builders.addCase(
    loginUser.fulfilled,
    (state: IUserStore, action: PayloadAction<any>) => {
      saveStorage('accessToken', action.payload.accessToken);
    },
  );

  builders.addCase(
    getUser.fulfilled,
    (state: IUserStore, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  );
};
