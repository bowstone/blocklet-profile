import { logger } from '@api/libs';
import { BizStatusCode, HttpStatusCode, IResponseData } from '@types';
import { validate as validateCore } from 'class-validator';
import { Request, Response } from 'express';

export class BaseControl {
  private readonly res: Response;

  protected readonly req: Request;

  constructor(_req: Request, _res: Response) {
    this.res = _res;
    this.req = _req;
  }

  /**
   * 服务非500错误，响应成功
   * @param data
   */
  protected response<T>(data: T, code: BizStatusCode = BizStatusCode.Success, message?: string) {
    this.res.status(HttpStatusCode.Ok as number);
    const body: IResponseData<T> = {
      message: message ?? BizStatusCode[code],
      data,
      code,
    };
    this.res.send(body);
  }

  /**
   * 服务成功的响应
   * @param data
   */
  protected success<T = unknown>(data: T) {
    this.response(data);
  }

  /**
   * 教研表单值格式
   * @param data
   * @returns
   */
  protected async validate<T extends object>(data: T): Promise<boolean> {
    const errors = await validateCore(data, { skipMissingProperties: true });
    if (errors?.length > 0) {
      logger.error(`请求参数错误：${JSON.stringify(errors)}`);
      const errs = errors.map((err) => {
        const { constraints, property } = err;
        return {
          [property]: Object.values(constraints as any),
        };
      });
      this.response(errs, BizStatusCode.ArgmentsError, `请求参数错误：${JSON.stringify(errs)}`);
      return false;
    }
    return true;
  }
}
