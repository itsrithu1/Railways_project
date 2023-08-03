import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Router, useNavigate } from 'react-router-dom';
// import './TrainDetails.css'; // Import the CSS file
import '../styles/TrainDetails.css'
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';

const DisplayTrains = ({ source, destination, date }) => {
  
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // window.location.href='./displaytrains'
    navigate('/bookingPassengerDetails');
  };

  //// Write the Data here once API is working
  const trainData = [
    { trainNo: '10', trainName: 'Train 1', departure: '09:00 AM', arrival: '12:00 PM', fare: 'Rs 500', seats_available: '320' },
    { trainNo: '11', trainName: 'Train 2', departure: '12:30 PM', arrival: '03:30 PM', fare: 'Rs 550', seats_available: '300' },
    { trainNo: '12', trainName: 'Train 3', departure: '10:00 AM', arrival: '08:00 PM', fare: 'Rs 1000', seats_available: '150' }
  ];

  return (
    <>
    <NavbarComponent/>
    <div className="train-details-container">
      <h2>Train Details</h2>
      <p>Source: {source}</p>
      <p>Destination: {destination}</p>
      <p>Date: {date}</p>
      <table>
        <thead>
          <tr>
            <th>Book This?</th>
            <th>Train No.</th>
            <th>Train Name</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Fare</th>
            <th>Seats Available</th>
          </tr>
        </thead>
        <tbody>
          {trainData.map((train, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="radio"
                  name="TrainBooking"
                  id={`Train${index + 1}`}
                  value={train.trainNo}
                />
              </td>
              <td>{train.trainNo}</td>
              <td>{train.trainName}</td>
              <td>{train.departure}</td>
              <td>{train.arrival}</td>
              <td>{train.fare}</td>
              <td>{train.seats_available}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
    <Footer/>
    </>
  );
};

export default DisplayTrains;