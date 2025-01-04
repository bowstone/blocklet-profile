import { logger } from '@api/libs';
import { User } from '@api/model/user';
import { UserService } from '@api/services';
import { BizStatusCode } from '@types';
import { isNumber } from 'class-validator';

import { BaseControl } from './base';

export class UserControl extends BaseControl {
  /**
   * 获取用户信息
   */
  public async getUserList(): Promise<void> {
    const {
      query: { pageSize: ps, pageNo: pn },
    } = this.req;
    const svc = new UserService();
    const pageSize = parseInt(ps as string, 10);
    const pageNo = parseInt(pn as string, 10);

    const user = await svc.getUserList({
      pageNo: Number.isNaN(pageNo) || pageNo < 1 ? 1 : pageNo,
      pageSize: Number.isNaN(pageSize) || pageSize < 1 ? 20 : pageSize,
    });
    this.success(user);
  }

  /**
   * 获取用户信息
   */
  public async getUserById(): Promise<void> {
    const {
      query: { id },
    } = this.req;
    if (!id) {
      logger.info('参数id为空');
      return this.response(null, BizStatusCode.ArgmentsError, 'id 参数必传');
    }
    const currId = +id;
    if (!isNumber(currId, { allowNaN: false })) {
      logger.info(`参数 id 格式错误: ${id}`);
      return this.response(null, BizStatusCode.ArgmentsError, '参数 id 格式错误');
    }
    const svc = new UserService();
    const user = (await svc.getUserById(id as unknown as number)) as User;
    return this.success(user);
  }

  /**
   * 创建用户信息
   * @param user
   * @returns
   */
  public async createUser(): Promise<void> {
    const { body } = this.req;
    const user: User = new User();
    Object.assign(user, {
      ...body,
      id: undefined,
    });
    if (!(await this.validate(user))) {
      return;
    }
    const svc = new UserService();
    const id = await svc.createUser(user);
    this.success(id);
  }

  /**
   * 更新用户信息
   * @param user
   * @returns
   */
  public async updateUser(): Promise<void> {
    try {
      const { body } = this.req;
      const user: User = new User();
      Object.assign(user, body);
      if (!(await this.validate(user))) {
        return;
      }
      const svc = new UserService();
      const id = await svc.updateUser(user);
      this.success(id);
    } catch (err) {
      logger.error(err);
      this.response(null, BizStatusCode.ArgmentsError, (err as Error).message);
    }
  }
}
