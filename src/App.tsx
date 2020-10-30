import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from './components/templates/Layout';
import { SearchBlock } from './components/SearchBlock';
import { HistoryBlock } from './components/HistoryBlock';
import { store } from './redux/configureStore';
import './styles/main.css';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <SearchBlock />
        <HistoryBlock />
      </Layout>
    </Provider>
  );
}

export default App;
