import {ILobby} from './lobby';
import {ISelectItem} from './common';

export interface IFormBooking {
  date: Date;
  time: ISelectItem;
  type_party: ISelectItem;
  quantityTable: number;
}

export interface IBookingReq {
  amount: number;
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
  id: number;
  type: CASH_TYPE;
  name: string;
}
