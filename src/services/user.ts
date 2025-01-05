import { api } from '@src/libs';
import { User } from '@src/model';

export const getUserById = async (id: number) => {
  const res = await api.get<User>('/user/profile', { params: { id } });
  return res;
};
