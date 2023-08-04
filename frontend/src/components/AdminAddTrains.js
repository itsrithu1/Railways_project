import React, { useState } from 'react';
import "../styles/bookingDetails.css";
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { Router, useNavigate } from 'react-router-dom';
const AdminAddTrains = () => {
  const [Trains, setTrains] = useState([
    {
   trainName: '',
      number: '',
      coaches: '',
      seats: '',
      source: '',
      destination: '',
      src_time: '',
      end_time:'',
      fair:'',
    },
  ]);
 

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setTrains((prevTrains) => {

      const updatedTrains = [...prevTrains];

      updatedTrains[index] = {

        ...updatedTrains[index],

        [name]: value,

      };

      return updatedTrains;

    });

  };

 

  const handleAddtrains = () => {

    setTrains((prevTrains) => [

      ...prevTrains,

      {

        trainName: '',

        number: '',

        coaches: '',

        seats: '',

        source: '',

        destination: '',

        src_time: '',

        end_time:'',

        fair:'',

      },

    ]);

  };

  const handleBack=()=>{

    // navigate('/AdminHomePage');

    window.location.href= '/AdminHomePage';

  };

 

 const [show,setShow]=useState(false)

  const handleSubmit = (e) => {

    e.preventDefault();

    setShow(true)
    // You can perform any actions with the form data here (e.g., API call, data validation, etc.).

    // For this example, we'll simply log the form data.

    console.log(Trains);

  };

 

 

  return (

    <>

    <NavbarComponent/>

    <form onSubmit={handleSubmit} >

      {Trains.map((Trains, index) => (

        <div key={index}>

          <h3>Train {index + 1}</h3>

          <div>

            <label htmlFor={`trainName${index}`}>Train Name:</label>

            <input

              type="text"

              id={`trainName${index}`}

              name="trainName"

              value={Trains.trainName}

              onChange={(e) => handleChange(index, e)}

              required

            />

          </div>

 

          <div>

       <label htmlFor={`number${index}`}> Train Number:</label>

         <input

          type="number"

          id={`number${index}`}

          name="number"

          value={Trains.number}

          onChange={(e) => handleChange(index, e)}

          required

        />

      </div>

 

      <div>

            <label htmlFor={`source${index}`}>Source:</label>

            <input

              type="text"

              id={`source${index}`}

              name="source"

              value={Trains.source}

              onChange={(e) => handleChange(index, e)}

              required

            />

          </div>

 

          <div>

            <label htmlFor={`destination${index}`}>Destination:</label>

            <input

              type="text"

              id={`destination${index}`}

              name="destination"

              value={Trains.destination}

              onChange={(e) => handleChange(index, e)}

              required

            />

          </div>

 

          <div>

            <label htmlFor={`src_time${index}`}>src_time:</label>

            <input

              type="time"

              id={`src_time${index}`}

              name="src_time"

              value={Trains.src_time}

              onChange={(e) => handleChange(index, e)}

              required

            />

          </div>

 

          <div>

            <label htmlFor={`dest_time${index}`}>end_time:</label>

            <input

              type="time"

              id={`end_time${index}`}

              name="end_time"

              value={Trains.end_time}

              onChange={(e) => handleChange(index, e)}

              required

            />

          </div>

 

      <div>

       <label htmlFor={`number${index}`}> Coaches:</label>

         <input

          type="number"

          id={`coaches${index}`}

          name="coaches"

          value={Trains.coaches}

          onChange={(e) => handleChange(index, e)}

          required

        />

      </div>

 

      <div>

       <label htmlFor={`number${index}`}> No of Seats:</label>

         <input

          type="number"

          id={`seats${index}`}

          name="seats"

          value={Trains.seats}

          onChange={(e) => handleChange(index, e)}

          required

        />

      </div>

 

      <div>

       <label htmlFor={`number${index}`}> Fair:</label>

         <input

          type="number"

          id={`fair${index}`}

          name="fair"

          value={Trains.fair}

          onChange={(e) => handleChange(index, e)}

          required

        />

      </div>

 

 

        </div>

      ))}

 

      <button type="button" onClick={handleAddtrains}>

        Add Train

      </button>

 

      <button type="submit" onClick={handleSubmit}>

        Add

      </button>

 

 

      <button type="button" onClick={handleBack}>Back</button>

    </form>






    <Modal
className="custom-modal"
// backdrop="static"
show={show}
onHide={() => setShow(false)}
dialogClassName="my-modal"
id="my-modal"
aria-labelledby="example-custom-modal-styling-title"
>
<Modal.Header closeButton className="custom-close-button">
{/* <Modal.Title id="example-custom-modal-styling-title"> */}
<h3
style={{ justifyContent: "center" ,marginLeft: '169px'}}
id="example-custom-modal-styling-title"
>
Train Booked Successfully
</h3>
{/* </Modal.Title> */}
</Modal.Header>
<Modal.Body style={{display:'grid'}}>

{Trains.map((Trains, index) => (

<div key={index}>


  <p>Train Name: {Trains.trainName}</p>

  <p>Train Number: {Trains.number}</p>

  <p>Number of Coaches: {Trains.coaches}</p>

  <p>Seats per Coach: {Trains.seats}</p>

  <p>Source: {Trains.source}</p>

  <p>Destination: {Trains.destination}</p>

  <p>Departure Time: {Trains.src_time}</p>

  <p>Arrival Time: {Trains.end_time}</p>

  <p>Fair: {Trains.fair}</p>


  <hr />

</div>

))}

<Button variant="success" onClick={() => setShow(false)}>Okay, Confirm</Button>


</Modal.Body>
</Modal>





    <Footer/>




    </>

  );

};

 

export default AdminAddTrains;