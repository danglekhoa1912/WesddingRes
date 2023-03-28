import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';
import {store} from '../store';
import {clearSpinner, hideSpinner, showSpinner} from '../store/global';
import {getStorage} from '../utils/storage';

interface IRequestAxios extends AxiosRequestConfig {
  skipLoading?: boolean;
}

const onRequestConfig = async (config: IRequestAxios) => {
  if (!config.headers['Authorization']) {
    const token = await getStorage('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  config.timeout = 30000;
  !config.skipLoading && store.dispatch(showSpinner());
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  store.dispatch(clearSpinner());
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  store.dispatch(hideSpinner());
  return res;
};

const onResponseError = async (
  err: AxiosError,
  axiosInstance: AxiosInstance,
): Promise<AxiosError | undefined> => {
  const originalConfig = err.config as AxiosRequestConfig;
  store.dispatch(clearSpinner());

  return Promise.reject(err?.response?.data);
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) =>
    onResponseError(err, axiosInstance),
  );
};
