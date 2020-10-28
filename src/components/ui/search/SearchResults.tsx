import React from 'react';

interface Props {
    items: string[];
    query: string
}

export const SearchResults = (props:Props) => {
  const { items, query } = props;

  return (
    <div className="search-results">
      {items.map((item) => {
        //  TODO: add recursive calculation
        const overlapInIndex = item.indexOf(query);

        if (overlapInIndex !== -1) {
          const selected = (
            <span className="search-results__selected">
              {item.slice(overlapInIndex, overlapInIndex + query.length)}
            </span>
          );

          return (
            <p key={item}>
              {item.slice(0, overlapInIndex)}
              {selected}
              {item.slice(overlapInIndex + query.length)}
            </p>
          );
        }

        return <p key={item}>{item}</p>;
      })}
    </div>
  );
};
