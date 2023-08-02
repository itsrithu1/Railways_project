// import React, { useState } from 'react';
// // import "src/styles/bookingDetails.css";
// import "../styles/bookingDetails.css";

// const BookingForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     phone: '',
//     email: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can perform any actions with the form data here (e.g., API call, data validation, etc.).
//     // For this example, we'll simply log the form data.
//     console.log(formData);
//   };

//   return (
    
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="age">Age:</label>
//         <input
//           type="number"
//           id="age"
//           name="age"
//           value={formData.age}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="gender">Gender:</label>
//         <select
//           id="gender"
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       <div>
//         <label htmlFor="phone">Phone No:</label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="email">Email ID:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//       <label htmlFor="Travel Insurance">Travel Insurance:</label>
     
//         <input
//           type="radio"
//           name="travelInsurance"
//           value="yes"
//           onChange={handleChange}
//         />
//         Yes
    
//         <input
//           type="radio"
//           name="travelInsurance"
//           value="no"
//           onChange={handleChange}
//         />
//         No
//     </div>

//     <div>
//         <label htmlFor="Food">Food Preferences</label>
//         <input
//         type="radio"
//         name="foodPrefernces"
//         value="no"
//         onChange={handleChange}
//         />
//         No

//         <input
//         type="radio"
//         name="foodPrefernces"
//         value="veg"
//         onChange={handleChange}
//         />
//         Veg

//         <input
//         type="radio"
//         name="foodPrefernces"
//         value="non-veg"
//         onChange={handleChange}
//         />
//         Non-Veg 
//     </div>



//       <button type="submit">Book Now</button>
//     </form>
//   );
// };

// export default BookingForm;


import React, { useState } from 'react';
import "../styles/bookingDetails.css";
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css' ;

const BookingDetails = () => {
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

  return (
    <>
    <NavbarComponent/>
    <form onSubmit={handleSubmit}>
      {passengers.map((passenger, index) => (
        <div key={index}>
          <h3>Passenger {index + 1}</h3>
          <div>
            <label htmlFor={`name${index}`}>Name:</label>
            <input
              type="text"
              id={`name${index}`}
              name="name"
              value={passenger.name}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </div>

          <div>
       <label htmlFor={`age${index}`}>Age:</label>
         <input
          type="number"
          id={`age${index}`}
          name="age"
          value={passenger.age}
          onChange={(e) => handleChange(index, e)}
          required
        />
      </div>

      <div>
        <label htmlFor={`gender${index}`}>Gender:</label>
        <select
          id={`gender${index}`}
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
      </div>

      <div>
        <label htmlFor={`phone${index}`}>Phone No:</label>
        <input
          type="tel"
          id={`phone${index}`}
          name="phone"
          value={passenger.phone}
          onChange={(e) => handleChange(index, e)}
          required
        />
      </div>

      <div>
        <label htmlFor={`email${index}`}>Email ID:</label>
        <input
          type="email"
          id={`email${index}`}
          name="email"
          value={passenger.email}
          onChange={(e) => handleChange(index, e)}
          required
        />
      </div>

      <div>
      <label htmlFor={`travelInsurance${index}`}>Travel Insurance:</label>
     
        <input
          type="radio"
          name="travelInsurance"
          value="yes"
          onChange={(e) => handleChange(index, e)}
          />
        Yes
    
        <input
          type="radio"
          name="travelInsurance"
          value="no"
          onChange={(e) => handleChange(index, e)}
          />
        No
    </div>

    <div>
        <label htmlFor={`foodPreferences${index}`}>Food Preferences</label>
        <input
        type="radio"
        name="foodPrefernces"
        value="no"
        onChange={(e) => handleChange(index, e)}
        />
        No

        <input
        type="radio"
        name="foodPrefernces"
        value="veg"
        onChange={(e) => handleChange(index, e)}
        />
        Veg

        <input
        type="radio"
        name="foodPrefernces"
        value="non-veg"
        onChange={(e) => handleChange(index, e)}
        />
        Non-Veg 
    </div>

        </div>
      ))}

      <button type="button" onClick={handleAddPassenger}>
        Add Passenger
      </button>

      <button type="submit">Book Now</button>
    </form>
    <Footer/>
    </>
  );
};

export default BookingDetails;

