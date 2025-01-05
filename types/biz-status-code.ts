/**
 * 业务状态码 状态码
 */
export enum BizStatusCode {
  /**
   * 请求成功
   */
  Success = 0,
  /**
   * 前端参数错误
   */
  ArgmentsError = 40010,
  /**
   * 服务错误
   */
  ServiceError = 50010,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}
