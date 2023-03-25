import {ISelectItem} from './common';

export interface IFormBooking {
  bookingDate: Date;
  session: ISelectItem;
  type: ISelectItem;
  quantity: number;
  dish: number[];
  service: number[];
  payment: number;
}

export interface IBookingReq {
  idUser: number;
  whId: number;
  pwtId: number;
  orderDate: Date;
  typePay: CASH_TYPE;
  quantity: number;
  note: string;
  menu: number[];
  service: number[];
  type_party: number;
  paymentStatus: boolean;
}

export interface ISession {
  id: number;
  price: number;
  session: string;
}

export enum CASH_TYPE {
  CASH = 1,
  MOMO = 2,
  ZALO = 3,
}

export interface ITypePay {
  id: CASH_TYPE;
  icon: JSX.Element;
  type: string;
  name: string;
}
