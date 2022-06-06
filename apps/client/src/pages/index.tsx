import { useRef, useState } from 'react';
import { GetServerSideProps } from 'next';

import { UserCard, SearchBar } from 'modules/users/components';
import { useGetUsers, prefetchUsers } from 'modules/users/queries/getUsers';
import useIntersectionObserver from 'modules/common/hooks/useIntersectionObserver';
import { Spinner } from 'modules/common/components';

const Home = () => {
  const [search, setSearch] = useState('');
  const handleSearch = (value) => setSearch(value);
  const target = useRef<HTMLDivElement>(null);
  useIntersectionObserver(target, () => fetchNextPage(), {
    threshold: 0.8,
  });

  const { data, isFetchingNextPage, fetchNextPage, isLoading, isSuccess } =
    useGetUsers(
      { limit: 12, name: search },
      {
        query: {
          staleTime: 30 * 1000,
        },
      }
    );

  return (
    <div className="container mx-auto">
      <SearchBar onSubmit={handleSearch} />
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const usersProps = await prefetchUsers({
    name: '',
    limit: 12,
    page: 1,
  });

  return {
    props: {
      ...usersProps,
    },
  };
};

export default Home;
