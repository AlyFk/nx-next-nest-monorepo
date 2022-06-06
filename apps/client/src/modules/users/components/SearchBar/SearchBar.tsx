import { useRef } from 'react';
import Image from 'next/image';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const searchValue = useRef<HTMLInputElement>(null);

  const handleClickBtn = () => {
    onSubmit(searchValue.current.value);
  };
  const handlePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(searchValue.current.value);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative mx-auto inline-block pt-2 text-gray-600">
        <input
          className="h-10 rounded-lg border-2 border-gray-300 bg-white px-5 pr-16 text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search username..."
          ref={searchValue}
          onKeyPress={handlePressKey}
        />
        <button
          onClick={handleClickBtn}
          aria-label="submit"
          className="absolute right-0 top-0 mt-5 mr-4"
        >
          <Image
            src="/icons/search.svg"
            alt="search icon"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
