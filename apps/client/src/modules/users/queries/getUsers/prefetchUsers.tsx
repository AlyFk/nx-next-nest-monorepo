import { dehydrate, QueryClient } from 'react-query';
import { getUsers } from './featchUsers';
import { IGitUsersRequest } from '@dpg-code-challenge/data';

const prefetchUsers = async ({ username, limit, page }: IGitUsersRequest) => {
  const queryClient = new QueryClient();

  const data = await getUsers({ limit, page, username });
  await queryClient.prefetchInfiniteQuery(['users', username], () => data);
  return {
    dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
  };
};

export default prefetchUsers;
