import React from 'react';
import { SearchIcon } from '../../icons/SearchIcon';

interface Props {
    onSearch(query: string): void;
    current?: string
    query?: string
}

export const SearchInput = (props: Props) => {
  const { onSearch, query, current } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-input">
      <div className="search-input__icon"><SearchIcon /></div>
      <input
        className="search-input__field"
        type="search"
        value={query}
        onChange={onChange}
        placeholder={current}
      />
    </div>
  );
};

SearchInput.defaultProps = {
  current: '',
  query: '',
};
