import React from 'react';
import './styles/main.css';
import { Layout } from './components/templates/Layout';
import { SearchBlock } from './components/SearchBlock';
import { HistoryBlock } from './components/HistoryBlock';

function App() {
  return (
    <Layout>
      <SearchBlock />
      <HistoryBlock />
    </Layout>
  );
}

export default App;
