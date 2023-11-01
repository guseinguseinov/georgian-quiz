import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import './styles.css';
import Quiz from './components/Quiz/Quiz';
import NotFound from './components/NotFound/NotFound';

function App() {

  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
