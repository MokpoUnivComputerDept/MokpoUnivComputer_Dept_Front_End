import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Router from './Router'
import React from 'react';
import Notice from './notice/Notice'
const {Subject, Search, Page} = Notice


function App() {
  return (
    <div>
      <Subject/>
      <Search/>
      <Page />

    </div>
  );
}


export default App;
