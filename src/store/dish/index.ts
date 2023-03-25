import {createSlice} from '@reduxjs/toolkit';
import {ICategory, IDish} from '../../type/dish';
import {reducer} from './reducer';

export interface IDishStore {
  dish: IDish;
  categories: ICategory;
}

const initialState = {
  dish: {
    categoryId: {
      id: 0,
      name: '',
    },
    id: 0,
    image: '',
    name: '',
    price: 0,
  },
  categories: {
    id: 0,
    name: '',
  },
} as IDishStore;

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: reducer,
  // extraReducers:''
});

export const {} = dishSlice.actions;

export default dishSlice.reducer;
