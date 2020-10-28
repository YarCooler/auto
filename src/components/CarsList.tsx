import React from 'react';
import { Car } from '../models/Car';

interface Props {
    list: Car[]
}

export const CarsList = (props: Props) => {
  const { list } = props;
  return (
    <div className="car-list">
      {list.map((car, index) => (
        <div className="car-list__item" key={car.price + index}>
          <p>{car.title}</p>
          <p className="car-list__price">{car.price}₽</p>
        </div>
      ))}
    </div>
  );
};
