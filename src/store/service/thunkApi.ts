import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';
import {IServiceStore} from '.';
import {ServiceApi} from '../../apis';
import {IServiceRequestParams, IServiceRes} from '../../type/service';
import {saveStorage} from '../../utils/storage';

export const getListService = createAsyncThunk(
  'service/getListService',
  async (params: IServiceRequestParams) => {
    const result = await ServiceApi.getListService(params);
    return result;
  },
);

export const addService = createAsyncThunk(
  'service/addService',
  async (service: IServiceRes) => {
    const result = await ServiceApi.addService(service);
    return result;
  },
);

export const deleteService = createAsyncThunk(
  'service/deleteService',
  async (id: number) => {
    const result = await ServiceApi.deleteService(id);
    return result;
  },
);

export const updateService = createAsyncThunk(
  'service/updateService',
  async (service: IServiceRes) => {
    const result = await ServiceApi.updateService(service);
    return result;
  },
);

export const extraReducers = (
  builders: ActionReducerMapBuilder<IServiceStore>,
) => {};
