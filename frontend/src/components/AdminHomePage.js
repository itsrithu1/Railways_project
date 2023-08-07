import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Router, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import { computeHeadingLevel } from '@testing-library/react';
import AdminSearchTrain from './AdminSearchTrain';



const EditPopup = ({ isOpen, onRequestClose,train,trainNumber, onSave ,displayTrainDetails}) => {
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
        displayTrainDetails()
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

  const handleDelete = ()=>{

    try {
            
      fetch(`http://localhost:3001/api/v1/admin/deleteTrain?trainNumber=${trainNumber}`, {
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

      if (data.flag=="OK") {
            alert("Train Deleted Successfully")
        console.log("successful")
            } else {
              alert("Some Error Occured, try after some time")
              
          }

      });



  } catch (err) {
    console.error("Error:", err);
    
  }
  onRequestClose();
  }

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

        

        <button type="button" onClick={handleSave}>
          Save
        </button>
        <Button variant="danger" onClick={handleDelete}>Delete Train</Button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
        
      </div>
    </Modal>
  );
};

const AdminHomePage = () => {
  
  const navigate = useNavigate();
  const [searchtrainNumber, setSearchTrainNumber] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [trainDetails ,setTrainDetails]=useState([])
  const [originaltrainDetails ,setOriginalTrainDetails]=useState([])

  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleTrainNumberChange = (event) => {
    setSearchTrainNumber(event.target.value);
  };

  const handleSearch = () => {
    // Here, you can perform the actual search based on the train number
    // For demonstration purposes, we'll just display the result on the page.
    // setSearchResult(`Searching for train number: ${searchtrainNumber}`);
    if(!searchtrainNumber){
      setTrainDetails(originaltrainDetails)
    }

    try {
            
      fetch(`http://localhost:3001/api/v1/admin/searchTrain?trainNumber=${searchtrainNumber}`, {
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
        setTrainDetails(data.data)
            } else {
              
          }

      });
  } catch (err) {
    console.error("Error:", err);
    
  }

  };

  const handleEdit = (index) => {
    console.log("hello the index is ",index)
    setSelectedTrain(index);
  };

  const handleAdd = () => {
    navigate('/AdminAddTrains');
  };



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
        setOriginalTrainDetails(data.data)
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
  },[]);

  return (
    <>
    {/* {console.log(trainDetails)} */}
      <NavbarComponent />
      
      <div className='page-container'>
        <div className="content-box train-details-container">
        {/* <AdminSearchTrain/> */}




        <div>
        <label htmlFor="trainNumber">Enter Train Number:</label>
        <input
          type="text"
          id="trainNumber"
          value={searchtrainNumber}
          onChange={handleTrainNumberChange}
        />
      </div>
      <div>
        <button onClick={handleSearch}>Submit</button>
      </div>
      <div>
        <p>{searchResult}</p>
      </div>









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
          displayTrainDetails = {displayTrainDetails}
          
        />
      )}

      <Footer />
    </>
  );
};

export default AdminHomePage;


