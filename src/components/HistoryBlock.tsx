import React from 'react';
import { CrossIcon } from './icons/CrossIcon';

export const HistoryBlock = () => {
  const list: string[] = ['first', 'second', 'third'];
  return (
    <div className="search-history">
      <p className="search-history__title">Недавнее</p>
      <ul className="search-history__list">
        {list.map((item) => (
          <li className="search-history__item">
            <p>{item}</p>
            <button type="button" className="search-history__delete">
              <CrossIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
