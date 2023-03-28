import {PayloadAction} from '@reduxjs/toolkit';
import {IUserStore} from '.';
import {removeStorage} from '../../utils/storage';

export const reducer = {
  logout: (state: IUserStore, action: PayloadAction) => {
    removeStorage('accessToken');
  },
};
