import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { getUsers } from './featchUsers';
import type { AxiosRequestConfig } from 'axios';
import type { AsyncReturnType } from 'app/types';

function useGetUsers<TData = AsyncReturnType<typeof getUsers>, TError = Error>(
  { limit, username }: { limit: number; username: string },
  options?: {
    query?: UseInfiniteQueryOptions<
      AsyncReturnType<typeof getUsers>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  }
) {
  const { query: queryOptions, axios: axiosOptions } = options || {};
  const queryKey = queryOptions?.queryKey ?? ['users', username];
  const queryFn = async ({ pageParam = 1 }) =>
    getUsers({ limit, page: pageParam, username }, axiosOptions);

  return useInfiniteQuery<AsyncReturnType<typeof queryFn>, TError, TData>(
    queryKey,
    queryFn,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.total_count > lastPage.currentPage * limit) {
          return lastPage.currentPage + 1;
        }
      },
      ...queryOptions,
    }
  );
}

export default useGetUsers;
