import * as users from './users.json';
import type { IGitUsersResponse, IUser } from '../../types';
export const getMockUsers = (
  page: number,
  limit: number
): IGitUsersResponse => {
  const items = users.items.slice(
    (page - 1) * limit,
    page * limit
  ) as unknown as IUser[];

  const usersData = users as unknown as IGitUsersResponse;
  return { ...usersData, items };
};
