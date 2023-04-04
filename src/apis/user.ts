import AxiosClient from '.';
import {ISearchParam} from '../type/common';
import {ILoginRes, IUser} from '../type/user';

export const register = (user: IUser) => {
  let filename = user.avatar.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('email', user.email);
  formdata.append('name', user.name);
  formdata.append('birthday', new Date(user.birthday).toString());
  formdata.append('password', user.password);
  formdata.append('mobile', user.mobile);
  formdata.append('avt', {
    uri: user.avatar,
    name: filename,
    type,
  });
  formdata.append('token', '');
  return AxiosClient.post('auth/signup', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const login = (data: ILoginRes) => {
  return AxiosClient.post('auth/login', {
    username: data.username,
    password: data.password,
    token: data.tokenDevice,
  });
};

export const getUser = () => {
  return AxiosClient.get('auth/user/profile');
};

export const getOrderHistory = (param: ISearchParam) => {
  const {page = 1, searchByName = ''} = param;
  return AxiosClient.get(`order/get-all-order`, {
    params: {
      page,
      searchByName,
    },
  });
};

export const getOrderHistoryById = (id: number) => {
  return AxiosClient.get('order/get-order-by-id', {
    params: {
      id,
    },
  });
};

export const updateUser = (user: IUser) => {
  let filename = user.avatar.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', user.name);
  formdata.append('birthday', new Date(user.birthday).toString());
  formdata.append('mobile', user.mobile);
  formdata.append('avt', {
    uri: user.avatar,
    name: filename,
    type,
  });
  return AxiosClient.post(`auth/user/profile`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllUser = () => {
  return AxiosClient.get('admin/user/getall');
};

export const getAllBookingService = () => {
  return AxiosClient.get('staff/order/all');
};

export const confirmBookingService = (id: number) => {
  return AxiosClient.post('staff/order/updatestt', {id});
};

export const addStaffService = (staff: IUser) => {
  let filename = staff.avatar.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', staff.name);
  formdata.append('email', staff.email);
  formdata.append('birthday', staff.birthday.toString());
  formdata.append('mobile', staff.mobile);
  formdata.append('password', '1');
  formdata.append('avt', {
    uri: staff.avatar,
    name: filename,
    type,
  });
  return AxiosClient.post('admin/addStaff', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateStaffService = (staff: IUser) => {
  let filename = staff.avatar.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('id', staff.id);
  formdata.append('name', staff.name);
  formdata.append('birthday', staff.birthday);
  formdata.append('mobile', staff.mobile);
  formdata.append('avt', {
    uri: staff.avatar,
    name: filename,
    type,
  });
  return AxiosClient.post('auth/staff/editprofile', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteStaffService = (id: number) => {
  return AxiosClient.post('admin/user/delete', {id});
};
