import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import './styles.css';
import Quiz from './components/Quiz/Quiz';

function App() {

  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path='/quiz' element={<Quiz />} />
    </Routes>
  )
}

export default App;
