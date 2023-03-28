import {IBookingStore} from './index';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {BookingApi} from '../../apis';
import {IBookingReq} from '../../type/booking';

export const addOrder = createAsyncThunk(
  'booking/addOrderService',
  async (order: IBookingReq) => {
    const result = await BookingApi.addOrderService(order);
    console.log(result);
    return result;
  },
);

export const getTypeTime = createAsyncThunk('booking/getTypeTime', async () => {
  const result = await BookingApi.getTypeTime();
  return result.data;
});

export const getTypeParty = createAsyncThunk(
  'booking/getTypeParty',
  async () => {
    const result = await BookingApi.getTypeParty();
    return result.data;
  },
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IBookingStore>,
) => {
  builders.addCase(
    getTypeTime.fulfilled,
    (state: IBookingStore, action: PayloadAction<any>) => {
      state.typeTime = action.payload;
    },
  ),
    builders.addCase(
      getTypeParty.fulfilled,
      (state: IBookingStore, action: PayloadAction<any>) => {
        state.typeParty = action.payload;
      },
    );
};
