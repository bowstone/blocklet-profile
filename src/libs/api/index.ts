import { createAxios } from '@blocklet/js-sdk';
import { BizStatusCode, HttpStatusCode, IResponseData } from '@types';
import { AxiosInstance as AxiosInstanceCore, AxiosRequestConfig, AxiosResponse } from 'axios';

import { logger } from '../logger';

declare interface AxiosInstance extends AxiosInstanceCore {
  request<T = any, R = IResponseData<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = IResponseData<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = IResponseData<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = IResponseData<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = IResponseData<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

const api: AxiosInstance = createAxios({
  baseURL: `${window?.blocklet?.prefix || '/'}api`,
});

const defaultErrorMessage = '服务异常,请稍后重试';

// @ts-ignore
api.interceptors.response.use((response: AxiosResponse<IResponseData, any>) => {
  const { status, data } = response;
  const { code } = data;
  if ([status, code].includes(HttpStatusCode.Unauthorized)) {
    logger.error('访问鉴权失败');
    return Promise.reject(data);
  }
  if (status === HttpStatusCode.InternalServerError || [BizStatusCode.ServiceError].includes(code)) {
    logger.error(defaultErrorMessage);
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      ...data,
      message: data.message || defaultErrorMessage,
    });
  }

  // 其他业务异常记录错误日志
  if (code !== BizStatusCode.Success) {
    logger.error(data);
    return Promise.reject(data);
  }

  return data;
});
export { api };

export default api;
