import AxiosClient from '.';
import {IServiceRequestParams, IServiceRes} from '../type/service';

export const getListService = (params: IServiceRequestParams) => {
  const {page = 1, searchByName = ''} = params;
  return AxiosClient.get(`order/service/getall`, {
    params: {
      page,
      searchByName,
    },
  });
};

export const addService = (service: IServiceRes) => {
  let filename = service.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', service.name);
  formdata.append('describe', service.serviceDescribe);
  formdata.append('price', service.price);
  formdata.append('img', {
    uri: service.image,
    name: filename,
    type,
  });
  return AxiosClient.post('admin/service/add', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateService = (service: IServiceRes) => {
  let filename = service.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('id', service.id);
  formdata.append('name', service.name);
  formdata.append('describe', service.serviceDescribe);
  formdata.append('price', service.price);
  formdata.append('img', {
    uri: service.image,
    name: filename,
    type,
  });
  return AxiosClient.post('admin/service/edit', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteService = (id: number) => {
  return AxiosClient.post(`admin/service/delete`, {id});
};
