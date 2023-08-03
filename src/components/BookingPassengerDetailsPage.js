import React, { useState } from 'react';
import "../styles/bookingDetails.css";
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    console.log(passengers);
  };

  const printinconsole = () => {
    console.log({passengers})
  }

  return (
    <>
      <NavbarComponent />
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
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
                    required
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
      <Footer />
    </>
  );
};

export default BookingPassengerDetails;
