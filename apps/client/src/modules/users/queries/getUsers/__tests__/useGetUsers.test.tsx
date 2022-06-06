import { renderHook } from '@testing-library/react-hooks';
import useGetUsers from '../useGetUsers';
import { createWrapper } from 'test-utils/wrapper';
import { getMockUsers } from '@dpg-code-challenge/data';

describe('testing useGetUsers hook', () => {
  const limit = 5;
  const search = 'test';
  const getMock = (page: number, limit: number) => ({
    ...getMockUsers(page, limit),
    currentPage: page,
  });
  test('sould fetchNextPage works fine in hook', async () => {
    const { result, waitFor } = renderHook(
      () => useGetUsers({ limit, name: search }),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data?.pages).toStrictEqual([getMock(1, limit)]);

    result.current.fetchNextPage();

    await waitFor(() => result.current.isFetching);
    await waitFor(() => !result.current.isFetching);

    expect(result.current.data?.pages).toStrictEqual([
      getMock(1, limit),
      getMock(2, limit),
    ]);
  });
});
