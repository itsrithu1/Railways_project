import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './SignIn';
import DisplayTrains from './components/TrainDetails';
import AdminAddTrains from './components/AdminAddTrains';
import AdminHomePage from './components/AdminHomePage';
import BookingPassengerDetails from './components/BookingPassengerDetailsPage';
import { BrowserRouter, Route, Router, Routes, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import AdminUpdatePage from './components/AdminHomePage';
import Navbar from 'react-bootstrap/Navbar';
import LandingPage from './components/LandingPage';
import NavDropdown from 'react-bootstrap/NavDropdown';
function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/SignIn" replace={true} />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/SignIn' element={<Login />} Default />
          <Route path='/LandingPage' element={<LandingPage />} />
          <Route path='/DisplayTrains' element={<DisplayTrains />} />
          <Route path='/bookingPassengerDetails' element={<BookingPassengerDetails />} />
          <Route path='/AdminHomePage' element={<AdminHomePage />} />
          <Route path='/AdminAddTrains' element={<AdminAddTrains />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}







export default App;
