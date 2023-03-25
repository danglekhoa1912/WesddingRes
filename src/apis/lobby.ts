import {ILobbyRes} from './../type/lobby';
import AxiosClient from '.';

export const getLobbyList = () => {
  return AxiosClient.get('order/weddinghall/getall');
};

export const getLobbyById = (id: number) => {
  return AxiosClient.get(`order/weddinghall/getall?id=${id}`);
};

export const addLooby = (lobby: ILobbyRes) => {
  let filename = lobby.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', lobby.name);
  formdata.append('capacity', lobby.capacity);
  formdata.append('describe', lobby.describe);
  formdata.append('price', lobby.price);
  formdata.append('image', {
    uri: lobby.image,
    name: filename,
    type,
  });
  return AxiosClient.post('admin/weddinghall/add', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateLobby = (lobby: ILobbyRes) => {
  let filename = lobby.image.split('/').pop();
  let match = /\.(\w+)$/.exec(filename || '');
  let type = match ? `image/${match[1]}` : `image`;
  let formdata = new FormData();
  formdata.append('name', lobby.name);
  formdata.append('capacity', lobby.capacity);
  formdata.append('id', lobby.id);
  formdata.append('describe', lobby.describe);
  formdata.append('price', lobby.price);
  formdata.append('image', {
    uri: lobby.image,
    name: filename,
    type,
  });
  return AxiosClient.post('admin/weddinghall/edit', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteLobby = (id: number) => {
  return AxiosClient.post(`admin/weddinghall/delete?id=${id}`);
};
