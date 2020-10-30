import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { SearchInput } from './ui/search/SearchInput';
import { SearchResults } from './ui/search/SearchResults';
import { CarsList } from './CarsList';
import { Store } from '../redux/store';
import { ExtendedAction, fetchHints, setCarsFilter } from '../redux/actions';
import { Hint } from '../models/Hint';
import { Car, CarFilter } from '../models/Car';

interface Props {
  hints: Hint[],
  cars: Car[],
  filter: CarFilter,
  fetchHints(text:string): ExtendedAction<string>,
  setCarsFilter(filter: CarFilter): ExtendedAction<CarFilter>
}

const SearchBlock = (props: Props) => {
  const [query, setQuery] = useState<string>('');
  const [inFocus, setInFocus] = useState<boolean>(false);
  const [selected, setSelected] = useState<Hint | undefined>(undefined);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const {
    fetchHints: fetchHintsAction,
    setCarsFilter: setCarsFilterAction,
    hints,
    cars,
    filter,
  } = props;

  const onSearch = (queryVal: string) => {
    setSelected(undefined);
    setQuery(queryVal);
    fetchHintsAction(queryVal);
  };

  const onBlur = (event: React.FocusEvent) => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current;
      if (event.currentTarget === wrapper) {
        return;
      }
      setInFocus(false);
    }
  };

  const onFocus = () => {
    setInFocus(true);
  };

  const onSelect = (value:Hint) => {
    setSelected(value);
    setQuery('');
    setCarsFilterAction({
      ...filter,
      filter: {
        ...filter.filter,
        catalog: [{
          brand_id: value.brand_id,
          model_id: value.model_id,
          folder_id: value.folder_id,
        }],
      },
    });
  };

  return (
    <div
      className="search-block"
      tabIndex={1}
      onBlur={onBlur}
      onFocus={onFocus}
      ref={wrapperRef}
    >
      <SearchInput
        query={query}
        onSearch={onSearch}
        placeholder={selected?.title}
      />

      {
        !!hints.length
          && inFocus
          && !selected
          && <SearchResults items={hints} query={query} onSelect={onSelect} />
      }

      {
        !!cars.length && selected && (
          <CarsList list={cars} />
        )
      }
    </div>
  );
};

const connectedWithRedux = connect(
  (state: { reducer:Store }) => ({
    hints: state.reducer.hints.list,
    cars: state.reducer.cars.list,
    filter: state.reducer.cars.filter,
  }),
  {
    fetchHints,
    setCarsFilter,
  },
)(SearchBlock);

export { connectedWithRedux as SearchBlock };
