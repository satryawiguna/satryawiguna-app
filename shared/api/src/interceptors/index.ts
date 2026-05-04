import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // Add custom logic here
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
};

export const requestErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  console.error('Request Error:', error);
  return Promise.reject(error);
};

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  console.log('Response:', response.status, response.config.url);
  return response;
};

export const responseErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  console.error('Response Error:', error.response?.status, error.config?.url);
  return Promise.reject(error);
};
