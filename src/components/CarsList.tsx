import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fromEvent } from 'rxjs';
import { Car, CarFilter } from '../models/Car';
import { Store } from '../redux/store';
import { ExtendedAction, setCarsPage } from '../redux/actions';

interface Props {
  list: Car[],
  filter: CarFilter,
  total: number,
  setCarsPage(page: number): ExtendedAction<number>
}

const CarsList = (props: Props) => {
  const {
    list, filter, total, setCarsPage: setCarsPageAction,
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollV = Math.round(
      (container.scrollTop * 100) / (container.scrollHeight - container.offsetHeight),
    );

    if (scrollV === 100 && list.length <= total) {
      setCarsPageAction(filter.page + 1);
    }
  }, [filter.page, list.length, setCarsPageAction, total]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.style.height = wrapper.clientHeight.toString();
      const s = fromEvent<React.UIEvent<HTMLDivElement>>(wrapper, 'scroll', {
        passive: true,
      }).subscribe((e) => {
        onScroll(e);
      });

      return () => s.unsubscribe();
    }
  }, [onScroll]);

  return (
    <div className="car-list-wrapper" ref={wrapperRef}>
      <ul className="car-list">
        {list.map((car, index) => {
          return (
            <li className="car-list__item" key={car.price + index}>
              <p>{car.fullName}</p>
              <p className="car-list__price">{car.price}₽</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const connectedWithRedux = connect(
  (state: { reducer:Store }) => ({
    filter: state.reducer.cars.filter,
    total: state.reducer.cars.total,
  }),
  {
    setCarsPage,
  },
)(CarsList);

export { connectedWithRedux as CarsList };
