import React, { useState } from 'react';
import { SearchInput } from './ui/search/SearchInput';
import { SearchResults } from './ui/search/SearchResults';
import { CarsList } from './CarsList';

export const SearchBlock = () => {
  const [query, setQuery] = useState('');
  return (
    <div>
      <SearchInput
        query={query}
        onSearch={(v) => {
          setQuery(v);
        }}
      />
      <SearchResults items={['first', 'second', 'third']} query="con" />
      <CarsList list={
          [
            { title: 'Range Rover Evoke', price: 100500 },
            { title: 'Jeep Wrangler', price: 10500 },
          ]
      }
      />
    </div>
  );
};
