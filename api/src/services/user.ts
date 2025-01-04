import { User } from '@api/model/user';
import { dataSource } from '@api/repository';
import { IResponsePageData, Page } from '@types';

export class UserService {
  /**
   * 获取用户列表
   * @param id
   * @returns
   */
  public async getUserList(page: Page): Promise<IResponsePageData<User>> {
    const repos = dataSource.getRepository(User);
    const { pageNo, pageSize } = page;
    const skip = (pageNo - 1) * pageSize;
    const [useList, total] = await repos.findAndCount({ skip, take: pageSize });

    return {
      items: useList,
      page: {
        total,
        pageNo,
        pageSize,
      },
    };
  }

  /**
   * 根据Id获取用户信息
   * @param id
   * @returns
   */
  public getUserById(id: number): Promise<User | null> {
    const repos = dataSource.getRepository(User);
    return repos.findOneBy({ id });
  }

  /**
   * 创建用户信息
   * @param user
   * @returns
   */
  public async createUser(user: User): Promise<number> {
    const repos = dataSource.getRepository(User);
    const saveUser = await repos.save(user);
    return saveUser.id!;
  }

  /**
   * 更新用户信息
   * @param user
   * @returns
   */
  public async updateUser(user: User): Promise<number> {
    const { id } = user;
    const existUser = await this.getUserById(id as number);
    if (!existUser) {
      throw new Error('用户不存在');
    }
    const repos = dataSource.getRepository(User);
    const saveUser = await repos.save(user);
    return saveUser.id!;
  }
}
