import React, { useState } from 'react';
import "../styles/bookingDetails.css";
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const BookingPassengerDetails = () => {
  const [passengers, setPassengers] = useState([
    {
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      travelInsurance: 'no',
      foodPreferences: 'no',
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [name]: value,
      };
      return updatedPassengers;
    });
  };

  const handleAddPassenger = () => {
    setPassengers((prevPassengers) => [
      ...prevPassengers,
      {
        name: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        travelInsurance: 'no',
        foodPreferences: 'no',
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any actions with the form data here (e.g., API call, data validation, etc.).
    // For this example, we'll simply log the form data.
    setShowModal(true);
    console.log(passengers);
  };

  const printinconsole = () => {
    console.log({passengers})
  }

  const handleDeletePassenger = (index) => {

    setPassengers((prevPassengers) => {

      const updatedPassengers = prevPassengers.filter((_, i) => i !== index);

      return updatedPassengers;

    });

  };


 

  const handleCloseModal = () => {

    setShowModal(false);

  };
  // const handleClose=()=>{
  //   navigate('/LandingPage')
  // }
 

  const [showModal, setShowModal] = useState(false);

 

  const PDFDocument = ({ passengers }) => {

    return (

      <Document>

        <Page style={styles.page}>

          {passengers.map((passenger, index) => (

            <View key={index} style={styles.passenger}>

              <Text>Name: {passenger.name}</Text>

              <Text>Age: {passenger.age}</Text>

              <Text>Gender: {passenger.gender}</Text>

              <Text>Phone No: {passenger.phone}</Text>

              <Text>Email ID: {passenger.email}</Text>

              <Text>Travel Insurance: {passenger.travelInsurance}</Text>

              <Text>Food Preferences: {passenger.foodPreferences}</Text>

            </View>

          ))}

        </Page>

      </Document>

    );

  };

 

  const styles = StyleSheet.create({

    page: {

      padding: 20,

    },

    passenger: {

      marginBottom: 10,

    },

  });

  return (
    <>
      <NavbarComponent />
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone No</th>
              <th>Email ID</th>
              <th>Travel Insurance</th>
              <th>Food Preferences</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={passenger.name}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="age"
                    value={passenger.age}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </td>
                <td>
                  <select
                    name="gender"
                    value={passenger.gender}
                    onChange={(e) => handleChange(index, e)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </td>
                <td>
                  <input
                    type="tel"
                    name="phone"
                    value={passenger.phone}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={passenger.email}
                    onChange={(e) => handleChange(index, e)}
                    
                  />
                </td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name={`travelInsurance${index}`}
                      value="yes"
                      // checked={passenger.travelInsurance === 'yes'}
                      
                      onChange={(e) => handleChange(index, e)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`travelInsurance${index}`}
                      value="no"
                      // checked={passenger.travelInsurance === 'no'}
                      onChange={(e) => handleChange(index, e)}
                    />
                    No
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name={`foodPreferences${index}`}
                      value="no"
                      // checked={passenger.foodPreferences === 'no'}
                      onChange={(e) => handleChange(index, e)}
                    />
                    No
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`foodPreferences${index}`}
                      value="veg"
                      // checked={passenger.foodPreferences === 'veg'}
                      onChange={(e) => handleChange(index, e)}
                    />
                    Veg
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`foodPreferences${index}`}
                      value="non-veg"
                      // checked={passenger.foodPreferences === 'non-veg'}
                      onChange={(e) => handleChange(index, e)}
                    />
                    Non-Veg
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={handleAddPassenger}>
          Add Passenger
        </button>
        <button type="submit" onClick={printinconsole}>Book Now</button>
      </form>

      <Modal show={showModal} onHide={handleCloseModal}>

        <Modal.Header closeButton>

          <Modal.Title>Passenger Details</Modal.Title>

        </Modal.Header>

        <Modal.Body>

          {passengers.map((passenger, index) => (

            <div key={index}>

              <p>Name: {passenger.name}</p>

              <p>Age: {passenger.age}</p>

              <p>Gender: {passenger.gender}</p>

              <p>Phone No: {passenger.phone}</p>

              <p>Email ID: {passenger.email}</p>

              <p>Travel Insurance: {passenger.travelInsurance}</p>

              <p>Food Preferences: {passenger.foodPreferences}</p>

              <Button

                variant="danger"

                onClick={() => handleDeletePassenger(index)}

              >

                Delete

              </Button>

              <hr />

            </div>

          ))}

        </Modal.Body>

        <Modal.Footer>
          {/* <Button onClick={handleClose}>Close</Button> */}

          <Button variant="secondary" onClick={handleCloseModal}>

            Back

          </Button>


          <PDFDownloadLink

            document={<PDFDocument passengers={passengers} />}

            fileName="passenger_details.pdf"

          >

            {({ blob, url, loading, error }) =>

              loading ? 'Loading document...' : 'Print Now'

            }

          </PDFDownloadLink>

        </Modal.Footer>

      </Modal>

      <Footer />
    </>
  );
};

export default BookingPassengerDetails;
