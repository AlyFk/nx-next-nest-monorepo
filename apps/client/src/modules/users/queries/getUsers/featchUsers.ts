import api from 'app/services/gate';
import type { AxiosRequestConfig } from 'axios';
import { IGitUsersRequest, IGitUsersResponse } from '@dpg-code-challenge/data';

export const getUsers = async (
  { limit, page, username }: IGitUsersRequest,
  options?: AxiosRequestConfig
) => {
  const data = await api.get<IGitUsersResponse>(
    `/users?username=${username}&page=${page}&limit=${limit}`,
    options
  );
  return { ...data.data, currentPage: page };
};
