import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Router, useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const places = ['Margao', 'Thane', 'Bangalore', 'Panvel', 'Chennai', 'Canacona', 'Ratnagiri'];

const LandingPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [destinationOptions, setDestinationOptions] = useState([...places]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (source && destination && date) {
      navigate(`/displaytrains?source=${source}&destination=${destination}&date=${date}`);
    } else {
      alert('Please enter valid values');
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30); // Add 30 days to current date

    if (selectedDate < new Date() || selectedDate > currentDate) {
      // Date is invalid, you can show an error message or prevent form submission
      console.log('Invalid date');
      setShow(false)
      Swal.fire({
        toast: true,
        icon: 'error',
        title: "Please select a date within 30 days from now!",
        position: 'top',
        showConfirmButton: false,
        confirmButtonColor: '#FF4433',
        timer: 1500,
      })

    } else {
      setDate(e.target.value);
    }
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);

    // Remove the selected source from destination options
    const updatedDestinations = places.filter((place) => place !== e.target.value);
    setDestinationOptions(updatedDestinations);
  };

  const [show, setShow] = useState(false);

  return (
    <>
    <NavbarComponent/>
    <div className='page-container'>
      <div className='card-container'>
        <Card className='custom-card'>
          <Card.Body>
            <Card.Title>Travel Information</Card.Title>
            <Form>
            <div className="form-row">
              <Form.Group className="inline-form-group">
                <Form.Label>Source</Form.Label>
                <div className="inline-input">
                <Form.Control
                  id='source'
                  as='select'
                  required
                  value={source}
                  onChange={handleSourceChange}
                >
                  <option value='' disabled>Select</option>
                  {places.map((place, index) => (
                    <option key={index} value={place}>
                      {place}
                    </option>
                  ))}
                </Form.Control>
                </div>
              </Form.Group>
              </div>
              

              
              <div className="form-row">
              <Form.Group className="inline-form-group">
                <Form.Label>Destination Place</Form.Label>
                <div className="inline-input">
                <Form.Control
                  id='destination'
                  as='select'
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value='' disabled>Select Destination</option>
                  {destinationOptions.map((place, index) => (
                    <option key={index} value={place}>
                      {place}
                    </option>
                  ))}
                </Form.Control>
                </div>
              </Form.Group>
              </div>

              <div className="form-row">
              <Form.Group className="inline-form-group">
                <Form.Label>Enter Date of Travel</Form.Label>
                <div className="inline-input">
                <Form.Control
                  id='date'
                  type='date'
                  placeholder='Enter Date of Travel'
                  value={date}
                  onChange={handleDateChange}
                  required
                />
                </div>
              </Form.Group>
              </div>

              {/* <Form.Group>
                <Form.Label>Are you a Senior Citizen</Form.Label>
                <div>
                  <Form.Check
                    type='radio'
                    label='Yes'
                    name='SeniorCitizen'
                    id='SeniorCitizenYes'
                    value='yes'
                    required
                  />
                  <Form.Check
                    type='radio'
                    label='No'
                    name='SeniorCitizen'
                    id='SeniorCitizenNo'
                    value='no'
                  />
                </div>
              </Form.Group> */}

              <Button variant='primary' type='submit' onClick={handleSubmit} style={{marginLeft:'130px'}} >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LandingPage;