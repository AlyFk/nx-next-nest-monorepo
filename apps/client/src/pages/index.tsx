import { SearchBar } from 'modules/users/components';
import { useState } from 'react';

export function Home() {
  const [search, setSearch] = useState('');
  const handleSearch = (value) => setSearch(value);
  return (
    <div className="container mx-auto">
      <SearchBar onSubmit={handleSearch} />
    </div>
  );
}

export default Home;
