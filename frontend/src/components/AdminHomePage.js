import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Router, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import { computeHeadingLevel } from '@testing-library/react';



const EditPopup = ({ isOpen, onRequestClose,train,trainNumber, onSave }) => {
  const [editedTrain, setEditedTrain] = useState({ ...train });
  
console.log(train)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTrain((prevTrain) => ({ ...prevTrain, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedTrain);

    try {
            
      fetch(`http://localhost:3001/api/v1/admin/updateTrain?train_Number=${trainNumber}`, {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accesss-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      editedTrain
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("recieved data is", data.data)
      

      if (data.flag=="OK") {
            
        console.log("successful")
            } else {
              // alert("No Trains Found")
              
          }

      });



  } catch (err) {
    console.error("Error:", err);
    
  }

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
          value={editedTrain.name}
          onChange={handleChange}
          name="name"
          required
        />

      {/* <label>Train No:</label>
        <input
        type="number"
        value={editedTrain.train_Number}
        onChange={handleChange}
        name="train_Number"
        required
        /> */}

      <label>Arrival Time:</label>
        <input
        type="time"
        value={editedTrain.startTime}
        onChange={handleChange}
        name="startTime"
        required
        />


      <label>Dept Time:</label>
        <input
        type="time"
        value={editedTrain.endTime}
        onChange={handleChange}
        name="endTime"
        required
        />


        <label>No of coaches:</label>
        <input
        type="number"
        value={editedTrain.numberOfCoach}
        onChange={handleChange}
        name="numberOfCoach"
        required
        />

      <label>No of Seats Per Coach:</label>
        <input
        type="number"
        value={editedTrain.numberOfSeatsPerCoach}
        onChange={handleChange}
        name="numberOfSeatsPerCoach"
        required
        />
<label>Fare :</label>
        <input
        type="number"
        value={editedTrain.fare}
        onChange={handleChange}
        name="fare"
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

const AdminHomePage = () => {
  // const [TrainData, setTrainData] = useState();
  // useEffect(() => {
  //   console.log(TrainData)
  // }, [TrainData])
  

  const navigate = useNavigate();


  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleEdit = (index) => {
    console.log("hello the index is ",index)
    setSelectedTrain(index);
  };

  const handleAdd = () => {
    navigate('/AdminAddTrains');
  };

  // const hardcodedTrainData = [
  //   // Your train data here
  //   { trainNo: '10', trainName: 'Train 1', Dept_Time: '09:00 am', Arrival_Time: '04:00 pm', Number_Of_Coaches: '5', Seats_Per_Coach: '72' },
  //   { trainNo: '11', trainName: 'Train 2', Dept_Time: '12:00 pm', Arrival_Time: '11:00 pm', Number_Of_Coaches: '5', Seats_Per_Coach: '72' },
  //   { trainNo: '12', trainName: 'Train 3', Dept_Time: '07:00 am', Arrival_Time: '03:00 am', Number_Of_Coaches: '5', Seats_Per_Coach: '72' }
  // ];

  const handleSaveEdit = (editedTrain) => {
    // Perform any actions to save the edited details
    // console.log("edited ",editedTrain)
    // console.log(hardcodedTrainData)
    // const updatedTrainData = [...trainDetails];
    // updatedTrainData[selectedTrain] = editedTrain;
    // // You can update the state or API here as per your use case
    // setTrainData(updatedTrainData); // Assuming setTrainData is a state updater function
    // console.log(TrainData);
  };


  const [trainDetails ,setTrainDetails]=useState([])
  const displayTrainDetails =()=>{

    // console.log("hello")
    try {
            
      fetch(`http://localhost:3001/api/v1/admin/displayAllTrains`, {
    method: "GET",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accesss-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log("recieved data is", data.data)
      

      if (data.flag=="OK") {
        // let temp=data.data
            // console.log(temp[0])
        setTrainDetails(data.data)
            } else {
              // alert("No Trains Found")
              
          }

      });



  } catch (err) {
    console.error("Error:", err);
    
  }


  }

  useEffect(() => {

    displayTrainDetails();
  },[trainDetails]);

  return (
    <>
    {/* {console.log(trainDetails)} */}
      <NavbarComponent />
      <div className='page-container'>
        <div className="content-box train-details-container">
          <h2>Train Details</h2>
          <table>
            <thead>
              <tr>
                <th>Train No.</th>
                <th>Train Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Number Of Coaches</th>
                <th>Seats Per Coach</th>
                <th>Fare</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {trainDetails && trainDetails.map((train, index) => (
                <tr key={index}>
                  <td>{train.train_Number}</td>
                  <td>{train.name}</td>
                  <td>{train.source}</td>
                  <td>{train.destination}</td>
                  
                  <td>{train.endTime}</td>
                  <td>{train.startTime}</td>
                  <td>{train.numberOfCoach}</td>
                  <td>{train.numberOfSeatsPerCoach}</td>
                  <td>{train.fare}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAdd}>Add Train</button>
        
        </div>
      </div>

      {/* Edit Popup */}
      {selectedTrain !== null && (
        <EditPopup
          isOpen={selectedTrain !== null}
          onRequestClose={() => setSelectedTrain(null)}
          train={trainDetails[selectedTrain]}
          trainNumber = {trainDetails[selectedTrain].train_Number}
          onSave={handleSaveEdit}
          
        />
      )}

      <Footer />
    </>
  );
};

export default AdminHomePage;


