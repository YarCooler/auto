import React from 'react';
import { connect } from 'react-redux';
import { Hint } from '../../../models/Hint';
import { Store } from '../../../redux/store';
import { ExtendedAction, fetchHints, pushHistoryItem } from '../../../redux/actions';

interface Props {
    items: Hint[];
    query: string;
    onSelect(value:Hint): void
    pushHistoryItemAction(hint:Hint): ExtendedAction<Hint>
}

const SearchResults = (props:Props) => {
  const {
    items, query, pushHistoryItemAction, onSelect,
  } = props;

  return (
    <div className="search-results search-block__result">
      {items.map((item, index) => {
        //  TODO: add recursive calculation
        const overlapInIndex = item.title.toLowerCase().indexOf(query.toLowerCase());

        const onItemSelect = () => {
          pushHistoryItemAction(item);
          onSelect(item);
        };

        if (overlapInIndex !== -1) {
          const selected = (
            <span className="search-results__selected">
              {item.title.slice(overlapInIndex, overlapInIndex + query.length)}
            </span>
          );

          return (
            <button
              onClick={onItemSelect}
              type="button"
              key={item.model_id + item.brand_id + item.folder_id}
              className="search-results__item"
            >
              {item.title.slice(0, overlapInIndex)}
              {selected}
              {item.title.slice(overlapInIndex + query.length)}
            </button>
          );
        }

        return (
          <button
            onClick={onItemSelect}
            type="button"
            key={item.model_id + index}
            className="search-results__item"
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

const connectedWithRedux = connect(
  (state: { reducer:Store }) => ({
    hints: state.reducer.hints.list,
  }),
  {
    fetchHints,
    pushHistoryItemAction: pushHistoryItem,
  },
)(SearchResults);

export { connectedWithRedux as SearchResults };
