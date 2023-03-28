import AxiosClient from '.';
import {IDishRes, IRequestParams} from '../type/dish';

export const getDishList = (params: IRequestParams) => {
  const {categoryId = 2, page = 1, searchByName = ''} = params;
  return AxiosClient.get(`order/dish/categoryId`, {
    params: {
      page,
      searchByName,
      i: categoryId,
    },
  });
};

export const getCategories = () => {
  return AxiosClient.get('order/dish/get-category');
};

export const addDish = (dish: IDishRes) => {
  let filename = dish.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formData = new FormData();
  formData.append('name', dish.name);
  formData.append('categoryId', dish.category);
  formData.append('price', dish.price);
  formData.append('image', {
    uri: dish.image,
    name: filename,
    type,
  });
  return AxiosClient.post('admin/dish/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateDish = (dish: IDishRes) => {
  let filename = dish.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formData = new FormData();
  formData.append('name', dish.name);
  formData.append('categoryId', dish.category);
  formData.append('price', dish.price);
  formData.append('image', {
    uri: dish.image,
    name: filename,
    type,
  });
  return AxiosClient.put(`admin/dish/change/id=${dish.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteDish = (id: number) => {
  return AxiosClient.post(`admin/dish/delete`, {id});
};

export const countDish = (cateId: number) => {
  return AxiosClient.get(`order/dish/count?categoryId=${cateId}`);
};
