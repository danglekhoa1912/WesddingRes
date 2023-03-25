import {createSelector} from '@reduxjs/toolkit';
import {AppState} from '..';

const sBooking = (state: AppState) => state.booking.booking;

export const sCountDishInMenu = createSelector(sBooking, booking => {
  return booking.menu.dishList.length;
});
