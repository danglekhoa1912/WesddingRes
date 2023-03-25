import {PayloadAction} from '@reduxjs/toolkit';
import {IUserState} from '.';

export const reducer = {
  saveTokenFromStorage: (state: IUserState, action: PayloadAction<string>) => {
    state.token = action.payload;
  },
};
