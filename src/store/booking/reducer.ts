import {IDish} from './../../type/dish';
import {PayloadAction} from '@reduxjs/toolkit';
import {IBookingStore} from '.';
import {IFormBooking} from '../../type/booking';
import {IService} from '../../type/service';

export const reducer = {
  updateInfoBooking: (
    state: IBookingStore,
    action: PayloadAction<IFormBooking>,
  ) => {
    state.booking.date = action.payload.bookingDate;
    // state.booking.lobbyId=action.payload.
  },
  addDishToMenu: (state: IBookingStore, action: PayloadAction<IDish>) => {
    state.booking.menu.dishList.push(action.payload);
    state.booking.menu.total += action.payload.price;
  },
  removeDishToMenu: (state: IBookingStore, action: PayloadAction<IDish>) => {
    state.booking.menu.dishList = state.booking.menu.dishList.filter(
      item => item.id != action.payload.id,
    );
    state.booking.menu.total -= action.payload.price;
  },
  addServiceToBooking: (state: IBookingStore, action: PayloadAction<any>) => {
    state.booking.service.serviceList.push(action.payload);
    state.booking.service.total += action.payload.price;
  },
  removeServiceToBooking: (
    state: IBookingStore,
    action: PayloadAction<IService>,
  ) => {
    state.booking.service.serviceList =
      state.booking.service.serviceList.filter(
        item => item.id != action.payload.id,
      );
    state.booking.service.total -= action.payload.price;
  },
  updateTypePay: (state: IBookingStore, action: PayloadAction<any>) => {
    state.booking.type_pay = action.payload;
  },
};
