import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Get from './components/get';
import Update from './components/Update';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get" element={<Get/>} />
          <Route path="/update/:id}" element={<Update/>} />   
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

