import { BizStatusCode } from './biz-status-code';

/**
 * 接口响应数据结构
 */
export interface IResponseData<T = any> {
  message: string;
  data: T;
  code: BizStatusCode;
}

/**
 * 分页信息
 */
export interface Page {
  total?: number;
  pageSize: number;
  pageNo: number;
}

/**
 * 分页数据
 */
export interface IResponsePageData<T> {
  items: Array<T>;
  page: Page;
}
