import {IBookingStore} from './index';
import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';
import {BookingApi} from '../../apis';
import {IBookingReq} from '../../type/booking';

export const addOrderService = createAsyncThunk(
  'booking/addOrderService',
  async (order: IBookingReq) => {
    const result = await BookingApi.addOrderService(order);
    return result;
  },
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IBookingStore>,
) => {};
