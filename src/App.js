import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import BaseRouter from './routes';
import 'antd/dist/antd.css';


import CustomLayout from './components/Layout';
import SearchBar from './containers/SearchBar';

function App() {

  return (
    <div className="App">
      <Router>
        <CustomLayout>
          <SearchBar />
          <BaseRouter />
        </CustomLayout>
      </Router>
    </div>
  );
}

export default App;