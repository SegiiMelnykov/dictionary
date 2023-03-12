import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import NewRecord from './pages/NewRecord';
import ChangeRecord from './pages/ChangeRecord';
import Header from 'components/header/Header';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/new-record' element={<NewRecord/>} />
        <Route path='/change-record/:id' element={<ChangeRecord/>} />

        <Route path='/dictionary/build/' element={<HomePage/>}/>
        <Route path='/dictionary/build/new-record' element={<NewRecord/>} />
        <Route path='/dictionary/build/change-record/:id' element={<ChangeRecord/>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
