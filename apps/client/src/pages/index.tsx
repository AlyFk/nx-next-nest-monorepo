import { useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { UserCard, SearchBar } from 'modules/users/components';
import { useGetUsers, prefetchUsers } from 'modules/users/queries/getUsers';
import useIntersectionObserver from 'modules/common/hooks/useIntersectionObserver';
import { Spinner } from 'modules/common/components';
import { toast } from 'react-toastify';

const limit = 12;
const toastId = 'users-page-toast';

const Home = () => {
  const router = useRouter();
  const { username } = router.query;

  const handleSearch = (value) =>
    router.push({ pathname: '/', query: { username: value } }, undefined, {
      shallow: true,
    });

  const target = useRef<HTMLDivElement>(null);
  useIntersectionObserver(target, () => fetchNextPage(), {
    threshold: 0.8,
  });

  const errorNotify = (message) => {
    toast.error(`Something went wrong: ${message}`, {
      toastId,
    });
  };

  const { data, isFetchingNextPage, fetchNextPage, isLoading, isSuccess } =
    useGetUsers(
      { limit, username: (username as string) || '' },
      {
        query: {
          retry: (failureCount, error) => {
            errorNotify(error.message);
            if (failureCount < 4) {
              return true;
            }
            return false;
          },
          onError: (error) => {
            errorNotify(error.message);
          },
          staleTime: 30 * 1000,
        },
      }
    );
  return (
    <div className="container mx-auto">
      <SearchBar onSubmit={handleSearch} />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-16 xl:grid-cols-4">
        {isSuccess &&
          data &&
          data.pages.map((users) =>
            users.items.map((user) => (
              <UserCard
                id={user.id}
                avatar_url={user.avatar_url}
                login={user.login}
                key={user.id}
              />
            ))
          )}
      </div>
      <div ref={target} data-testid="show more" className="bg-transparent" />
      {isLoading || isFetchingNextPage ? <Spinner /> : null}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;
  const usersProps = await prefetchUsers({
    username: (username as string) || '',
    limit,
    page: 1,
  });

  return {
    props: {
      ...usersProps,
    },
  };
};

export default Home;
