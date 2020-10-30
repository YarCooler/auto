import React from 'react';
import { connect } from 'react-redux';
import { CrossIcon } from './icons/CrossIcon';
import { Store } from '../redux/store';
import { deleteHistoryItem, ExtendedAction } from '../redux/actions';
import { Hint } from '../models/Hint';

interface Props {
  history: Hint[];
  deleteHistoryItemAction(hint: Hint): ExtendedAction<Hint>
}

const HistoryBlock = (props: Props) => {
  const { history, deleteHistoryItemAction } = props;

  return (
    <div className="search-history">
      <p className="search-history__title">Недавнее</p>
      <ul className="search-history__list">
        {history.map((item, index) => {
          const onDelete = () => {
            deleteHistoryItemAction(item);
          };

          return (
            <li className="search-history__item" key={item.model_id + index}>
              <p>{item.title}</p>
              <button
                type="button"
                className="search-history__delete"
                onClick={onDelete}
              >
                <CrossIcon />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const connectedWithRedux = connect(
  (state: { reducer: Store }) => ({
    history: state.reducer.history,
  }),
  {
    deleteHistoryItemAction: deleteHistoryItem,
  },
)(HistoryBlock);

export { connectedWithRedux as HistoryBlock };
