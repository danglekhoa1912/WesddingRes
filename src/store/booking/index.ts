import {createSlice} from '@reduxjs/toolkit';
import {CASH_TYPE} from '../../type/booking';
import {IDish} from '../../type/dish';
import {IService} from '../../type/service';
import {reducer} from './reducer';

export interface IBookingStore {
  booking: {
    menu: {
      dishList: IDish[];
      total: number;
    };
    service: {
      serviceList: IService[];
      total: number;
    };
    date: Date;
    lobbyId: number;
    time: string;
    quantityTable: number;
    type_pay: CASH_TYPE;
    lobbyPriceByTime: number;
    note: string;
  };
}

const initialState = {
  booking: {
    menu: {
      dishList: [],
      total: 0,
    },
    service: {
      serviceList: [],
      total: 0,
    },
    date: new Date(),
    lobbyId: 0,
    time: '',
    quantityTable: 0,
    type_pay: CASH_TYPE.CASH,
    lobbyPriceByTime: 0,
    note: '',
  },
} as IBookingStore;

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: reducer,
  // extraReducers:''
});

export const {
  addDishToMenu,
  addServiceToBooking,
  removeDishToMenu,
  removeServiceToBooking,
  updateInfoBooking,
  updateTypePay,
} = bookingSlice.actions;

export default bookingSlice.reducer;
