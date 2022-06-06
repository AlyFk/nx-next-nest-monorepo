import { dehydrate, QueryClient } from 'react-query';
import { getUsers } from './featchUsers';
import { IGitUsersRequest } from '@dpg-code-challenge/data';

const prefetchUsers = async ({ name, limit, page }: IGitUsersRequest) => {
  const queryClient = new QueryClient();

  const data = await getUsers({ limit, page, name });
  await queryClient.prefetchInfiniteQuery(['users', name], () => data);
  return {
    dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
  };
};

export default prefetchUsers;
