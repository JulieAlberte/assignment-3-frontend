import React from 'react';
import './App.css';
import { Routing } from './Routing';
require('dotenv').config();

const App: React.FC = () => {
  return (
    <Routing/>
  );
};

export default App;
