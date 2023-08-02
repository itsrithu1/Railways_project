import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './SignIn';
import BookingDetails from './components/bd';
import { BrowserRouter, Route, Router, Routes, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';

import NavDropdown from 'react-bootstrap/NavDropdown';
function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/SignIn" replace={true} />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/SignIn' element={<Login />} Default/>
          <Route path='/bookingDetails' element={<BookingDetails/>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}







export default App;
