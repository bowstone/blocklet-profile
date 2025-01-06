import { api } from '@src/libs';
import { User } from '@src/model';

/**
 * 根据Id获取用户profile
 * @param id
 * @returns
 */
export const getUserById = async (id: number) => {
  const res = await api.get<User>('/user/profile', { params: { id } });
  return res;
};

/**
 * 创建用户Profile
 * @param user
 * @returns
 */
export const createUser = async (user: User) => {
  const res = await api.post<number>('/user/profile', user);
  return res;
};

/**
 * 更新用户Profile
 * @param user
 * @returns
 */
export const updateUser = async (user: User) => {
  const res = await api.put<number>('/user/profile', user);
  return res;
};
