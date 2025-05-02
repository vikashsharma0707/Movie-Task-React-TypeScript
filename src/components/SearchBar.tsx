import { ChangeEvent } from 'react';
import '../css/SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search for movies (e.g., Inception, The Matrix)..."
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;