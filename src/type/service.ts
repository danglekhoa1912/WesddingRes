export interface IService {
  id: number;
  name: string;
  price: number;
  serviceDescribe: string;
  image: string;
}

export interface IServiceRequestParams {
  page?: number;
  searchByName?: string;
}

export interface IServiceRes {
  id?: number;
  name: string;
  serviceDescribe: string;
  image: string;
  price: number;
}
