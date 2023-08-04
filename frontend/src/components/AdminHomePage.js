import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Router, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import { computeHeadingLevel } from '@testing-library/react';



const EditPopup = ({ isOpen, onRequestClose, train, onSave }) => {
  const [editedTrain, setEditedTrain] = useState({ ...train });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTrain((prevTrain) => ({ ...prevTrain, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedTrain);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Train Details"
      ariaHideApp={false}
    >
      <h2>Edit Train Details</h2>
      <div>
        <label>Train Name:</label>
        <input
          type="text"
          value={editedTrain.trainName}
          onChange={handleChange}
          name="trainName"
          required
        />

      <label>Train No:</label>
        <input
        type="number"
        value={editedTrain.trainNo}
        onChange={handleChange}
        name="trainNo"
        required
        />

      <label>Arrival Time:</label>
        <input
        type="time"
        value={editedTrain.Arrival_Time}
        onChange={handleChange}
        name="Arrival_Time"
        required
        />


      <label>Dept Time:</label>
        <input
        type="time"
        value={editedTrain.Dept_Time}
        onChange={handleChange}
        name="Dept_Time"
        required
        />


        <label>No of coaches:</label>
        <input
        type="number"
        value={editedTrain.Number_Of_Coaches}
        onChange={handleChange}
        name="Number_Of_Coaches"
        required
        />

      <label>No of Seats:</label>
        <input
        type="number"
        value={editedTrain.Seats_Per_Coach}
        onChange={handleChange}
        name="Seats_Per_Coach"
        required
        />


        

        {/* Add other input fields for other train details here */}
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
        
      </div>
    </Modal>
  );
};

const AdminHomePage = ({ source, destination, date }) => {
  const [TrainData, setTrainData] = useState();
  useEffect(() => {
    console.log(TrainData)
  }, [TrainData])
  

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/SignIn');
  };

  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleEdit = (index) => {
    setSelectedTrain(index);
  };

  const handleAdd = () => {
    navigate('/AdminAddTrains');
  };

  const hardcodedTrainData = [
    // Your train data here
    { trainNo: '10', trainName: 'Train 1', Dept_Time: '09:00 am', Arrival_Time: '04:00 pm', Number_Of_Coaches: '5', Seats_Per_Coach: '72' },
    { trainNo: '11', trainName: 'Train 2', Dept_Time: '12:00 pm', Arrival_Time: '11:00 pm', Number_Of_Coaches: '5', Seats_Per_Coach: '72' },
    { trainNo: '12', trainName: 'Train 3', Dept_Time: '07:00 am', Arrival_Time: '03:00 am', Number_Of_Coaches: '5', Seats_Per_Coach: '72' }
  ];

  const handleSaveEdit = (editedTrain) => {
    // Perform any actions to save the edited details
    console.log(editedTrain)
    console.log(hardcodedTrainData)
    const updatedTrainData = [...hardcodedTrainData];
    updatedTrainData[selectedTrain] = editedTrain;
    // You can update the state or API here as per your use case
    setTrainData(updatedTrainData); // Assuming setTrainData is a state updater function
    // console.log(TrainData);
  };

  return (
    <>
      <NavbarComponent />
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
              {hardcodedTrainData.map((train, index) => (
                <tr key={index}>
                  <td>{train.trainNo}</td>
                  <td>{train.trainName}</td>
                  <td>{train.Dept_Time}</td>
                  <td>{train.Arrival_Time}</td>
                  <td>{train.Number_Of_Coaches}</td>
                  <td>{train.Seats_Per_Coach}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAdd}>Add Train</button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Logout
          </Button>
        </div>
      </div>

      {/* Edit Popup */}
      {selectedTrain !== null && (
        <EditPopup
          isOpen={selectedTrain !== null}
          onRequestClose={() => setSelectedTrain(null)}
          train={hardcodedTrainData[selectedTrain]}
          onSave={handleSaveEdit}
        />
      )}

      <Footer />
    </>
  );
};

export default AdminHomePage;


