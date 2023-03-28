import AxiosClient from '.';
import {IBookingReq} from '../type/booking';

export const addOrderService = (order: IBookingReq) => {
  return AxiosClient.post('order/add', order);
};

export const getTypeTime = () => {
  return AxiosClient.get('order/typetime');
};

export const getTypeParty = () => {
  return AxiosClient.get('order/type-party');
};

// export const checkTimeBookingService = (timeBooking) => {
//   const { date, time, lobbyId } = timeBooking;
//   return AxiosClient.put('order/checktime', {
//     hall: lobbyId,
//     date: new Date(date),
//     time,
//   });
// };
