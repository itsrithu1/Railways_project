import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Router, useNavigate } from 'react-router-dom';
//import './TrainDetails.css'; // Import the CSS file
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';

const AdminHomePage = ({ source, destination, date }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // window.location.href='./displaytrains'
    navigate('/SignIn');
  };
  
  const handleEdit=()=>{
//add edit popup to chnage details
  };

  const handleAdd=()=>{
        navigate('/AdminAddTrains');
  };
  const trainData = [
    // Your train data here
    { trainNo: '10', trainName: 'Train 1', Dept_Time: '09:00 am', Arrival_Time: '04:00 pm' ,Number_Of_Coaches: '5', Seats_Per_Coach: '72' },
    { trainNo: '11', trainName: 'Train 2', Dept_Time: '12:00 pm', Arrival_Time: '11:00 pm' ,Number_Of_Coaches: '5', Seats_Per_Coach: '72' },
    { trainNo: '12', trainName: 'Train 3', Dept_Time: '07:00 am', Arrival_Time: '03:00 am' ,Number_Of_Coaches: '5', Seats_Per_Coach: '72' }
  ];

  return (
    <>
    <NavbarComponent/>
    <div className='page-container'>
      <div className="content-box train-details-container">
        <h2>Train Details</h2>
        <table>
          <thead>
            <tr>
             
              <th>Train No.</th>
              <th>Train Name</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Number Of Coaches</th>
              <th>Seats Per Coach</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trainData.map((train, index) => (
              <tr key={index}>
                {/* <td>
                  <Form.Check
                    type="radio"
                    name="TrainBooking"
                    id={`Train${index + 1}`}
                    value={train.trainNo}
                  />
                </td> */}
                <td>{train.trainNo}</td>
                <td>{train.trainName}</td>
                <td>{train.Dept_Time}</td>
                <td>{train.Arrival_Time}</td>
                <td>{train.Number_Of_Coaches}</td>
                <td>{train.Seats_Per_Coach}</td>
                <td>
                    <button onClick={handleEdit}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
                <button onClick={handleAdd} >Add Train</button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Logout
        </Button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminHomePage;