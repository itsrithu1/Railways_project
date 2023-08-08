// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import "../styles/bookingDetails.css";
// import NavbarComponent from './NavbarComponent';
// import Footer from './Footer';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Router, useNavigate } from 'react-router-dom';
// const AdminAddTrains = () => {
//   const [Trains, setTrains] = useState(
//     {
//       train_Number: '',
//       name: '',
//       source: '',
//       destination: '',
//       numberOfCoach: '',
//       numberOfSeatsPerCoach: '',
//       startTime: '',
//       endTime: '',
//       fare: '',
//     }
//   );

//   useEffect(() => {
//     console.log({ Trains });
//   }, [Trains]);


//   const handleTnameChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       name: e.target.value,
//     }));
//   };

//   const handleTnumberChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       train_Number: e.target.value,
//     }));
//   };

//   const handleTsourceChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       source: e.target.value,
//     }));
//   };

//   const handleTdesitinationChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       destination: e.target.value,
//     }));
//   };

//   const handleTsourcetimeChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       startTime: e.target.value,
//     }));
//   };

//   const handleTendtimeChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       endTime: e.target.value,
//     }));
//   };

//   const handleTcoachesChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       numberOfCoach: e.target.value,
//     }));
//   };

//   const handleTseatsChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       numberOfSeatsPerCoach: e.target.value,
//     }));
//   };

//   const handleTfareChange = (e) => {
//     setTrains((prevTrains) => ({
//       ...prevTrains,
//       fare: e.target.value,
//     }));
//   };


//   const handleBack = () => {

//     // navigate('/AdminHomePage');

//     window.location.href = '/AdminHomePage';

//   };



//   const [show, setShow] = useState(false)

//   const handleSubmit = (e) => {

//     e.preventDefault();

//     setShow(true)


//     try {

//       fetch(`http://localhost:3001/api/v1/admin/createTrain`, {
//         method: "POST",
//         crossDomain: true,
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "Accesss-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//           Trains
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {



//         });



//     } catch (err) {
//       console.error("Error:", err);

//     }

//     console.log(Trains);

//   };





//   return (

//     <>

//       <NavbarComponent />

//       <form onSubmit={handleSubmit} >
        
//           <div class="add_train">

//             <h3>Add Train </h3>

//             <div class="input">
//               <label >Train Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 onChange={handleTnameChange}
//                 required
//               />
//             </div>


//             <div class="input">
//               <label > Train Number:</label>
//               <input
//                 type="number"
//                 name="train_Number"
//                 onChange={handleTnumberChange}
//                 required
//               />
//             </div>



//             <div class="input">
//               <label >Source:</label>
//               <input
//                 type="text"
//                 name="source"
//                 value={Trains.source}
//                 onChange={handleTsourceChange}
//                 required
//               />
//             </div>



//             <div class="input">
//               <label >Destination:</label>
//               <input
//                 type="text"
//                 name="destination"
//                 value={Trains.destination}
//                 onChange={handleTdesitinationChange}
//                 required
//               />
//             </div>

//             <div class="input">
//               <label >source time:</label>
//               <input
//                 type="time"
//                 name="startTime"
//                 value={Trains.startTime}
//                 onChange={handleTsourcetimeChange}
//                 required
//               />
//             </div>



//             <div class="input">
//               <label>End Time:</label>
//               <input
//                 type="time"
//                 name="endTime"
//                 value={Trains.endTime}
//                 onChange={handleTendtimeChange}
//                 required
//               />
//             </div>


//             <div class="input">
//               <label> Coaches:</label>
//               <input
//                 type="number"
//                 name="numberOfCoach"
//                 value={Trains.numberOfCoach}
//                 onChange={handleTcoachesChange}
//                 required
//               />
//             </div>



//             <div class="input">
//               <label > No of Seats:</label>
//               <input
//                 type="number"
//                 name="numberOfSeatsPerCoach"
//                 value={Trains.numberOfSeatsPerCoach}
//                 onChange={handleTseatsChange}
//                 required
//               />
//             </div>



//             <div class="input">
//               <label > Fare:</label>
//               <input
//                 type="number"
//                 name="fare"
//                 value={Trains.fare}
//                 onChange={handleTfareChange}
//                 required
//               />
//             </div>
//             <label>
//             <button type="button" onClick={handleBack}>Back</button>
//             </label>
            
//             <label> 
//             <button type="submit" onClick={handleSubmit}>
//               Add
//             </button>
//             </label>
            
            
//           </div>
//       </form>

//       <Modal
//         className="custom-modal"
//         // backdrop="static"
//         show={show}
//         onHide={() => setShow(false)}
//         dialogClassName="my-modal"
//         id="my-modal"
//         aria-labelledby="example-custom-modal-styling-title"
//       >
//         <Modal.Header closeButton className="custom-close-button">
//           {/* <Modal.Title id="example-custom-modal-styling-title"> */}
//           <h3
//             style={{ justifyContent: "center", marginLeft: '169px' }}
//             id="example-custom-modal-styling-title"
//           >
//             Train Added Successfully
//           </h3>
//           {/* </Modal.Title> */}
//         </Modal.Header>
//         <Modal.Body style={{ display: 'grid' }}>
//           <div >
//             <p>Train Name: {Trains.name}</p>
//             <p>Train Number: {Trains.train_Number}</p>
//             <p>Number of Coaches: {Trains.numberOfCoach}</p>
//             <p>Seats per Coach: {Trains.numberOfSeatsPerCoach}</p>
//             <p>Source: {Trains.source}</p>
//             <p>Destination: {Trains.destination}</p>
//             <p>Departure Time: {Trains.startTime}</p>
//             <p>Arrival Time: {Trains.endTime}</p>
//             <p>Fare: {Trains.fare}</p>
//             <hr />
//           </div>
//           <Button variant="success" onClick={() => setShow(false)}>Okay, Confirm</Button>
//         </Modal.Body>
//       </Modal>





//       <Footer />




//     </>

//   );

// };



// export default AdminAddTrains;





import React, { useEffect, useLayoutEffect, useState } from "react";

import "../styles/AdminAddTrains.css";

import NavbarComponent from "./NavbarComponent";

import Footer from "./Footer";

import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

import { Router, useNavigate } from "react-router-dom";

const AdminAddTrains = () => {
  const [Trains, setTrains] = useState({
    train_Number: "",

    name: "",

    sourceToDest: "",

    sourceToDestDepTime: "",

    numberOfCoach: "",

    numberOfSeatsPerCoach: "",

    distanceFromSource: "",

   

    fare: "",
  });

  useEffect(() => {
    console.log({ Trains });
  }, [Trains]);

  const handleTnameChange = (e) => {
    setTrains((prevTrains) => ({
      ...prevTrains,

      name: e.target.value,
    }));
  };

  const handleTnumberChange = (e) => {
    setTrains((prevTrains) => ({
      ...prevTrains,

      train_Number: e.target.value,
    }));
  };

  const handleTsourceToDestChange = (e) => {
    setTrains((prevTrains) => ({
      ...prevTrains,

      sourceToDest: e.target.value,
    }));
  };

  const handleTsourceToDestDepTimeChange = (e) => {
    setTrains((prevTrains) => ({
      ...prevTrains,

      sourceToDestDepTime: e.target.value,
    }));
  };

  const handleTdistanceChange = (e) => {
    setTrains((prevTrains) => ({
      ...prevTrains,

      distanceFromSource: e.target.value,
    }));
  };

  // const handleTendtimeChange = (e) => {
  //   setTrains((prevTrains) => ({
  //     ...prevTrains,

  //     endTime: e.target.value,
  //   }));
  // };

  const handleTcoachesChange = (e) => {
    setTrains((prevTrains) => ({
      ...prevTrains,

      numberOfCoach: e.target.value,
    }));
  };

  const handleTseatsChange = (e) => {
    setTrains((prevTrains) => ({
      ...prevTrains,

      numberOfSeatsPerCoach: e.target.value,
    }));
  };

  const handleTfareChange = (e) => {
    setTrains((prevTrains) => ({
      ...prevTrains,

      fare: e.target.value,
    }));
  };

  const handleBack = () => {
    // navigate('/AdminHomePage');

    window.location.href = "/AdminHomePage";
  };

  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(Trains)
    

    try {
      fetch(`http://localhost:3001/api/v1/admin/createTrainNew`, {
        method: "POST",

        crossDomain: true,

        headers: {
          "Content-Type": "application/json",

          Accept: "application/json",

          "Accesss-Control-Allow-Origin": "*",
        },

        body: JSON.stringify({
          Trains,
        }),
      })
        .then((res) => res.json())

        .then((data) => {
          console.log(data.data);
          if (data.flag=="OK") {
            // let temp=data.data
            setShow(true);
                }else {
                  alert(data.data)
                }


        });
    } catch (err) {
      console.error("Error:", err);
    }

    console.log(Trains);
  };

  return (
    <>
      <NavbarComponent />

      <form onSubmit={handleSubmit}>
        <div
          class="add_train"
          style={{ border: "1px solid #ccc", padding: "20px" }}
        >
          <h4 style={{ marginBottom: "15px" }}>Add Train </h4>

          <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}>Train Name:</label>

            <input
              type="text"
              name="name"
              onChange={handleTnameChange}
              required
              style={{ width: "200px" }}
            />
          </div>

          <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}> Train Number:</label>

            <input
              type="number"
              name="train_Number"
              onChange={handleTnumberChange}
              required
              style={{ width: "200px" }}
            />
          </div>

          <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}>Source to Destination Stations:</label>

            <input
              type="text"
              name="sourceToDest"
              value={Trains.sourceToDest}
              onChange={handleTsourceToDestChange}
              required
              style={{ width: "200px" }}
            />
          </div>

          <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}>Departure Time at each Station:</label>

            <input
              type="text"
              name="sourceToDestDepTime"
              value={Trains.sourceToDestDepTime}
              onChange={handleTsourceToDestDepTimeChange}
              required
              style={{ width: "200px" }}
            />
          </div>

          <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}>Distance From Source:</label>

            <input
              type="text"
              name="distanceFromSource"
              value={Trains.distanceFromSource}
              onChange={handleTdistanceChange}
              required
              style={{ width: "200px" }}
            />
          </div>

          {/* <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}>End Time:</label>

            <input
              type="time"
              name="endTime"
              value={Trains.endTime}
              onChange={handleTendtimeChange}
              required
              style={{ width: "200px" }}
            />
          </div> */}

          <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}> Coaches:</label>

            <input
              type="number"
              name="numberOfCoach"
              value={Trains.numberOfCoach}
              onChange={handleTcoachesChange}
              required
              style={{ width: "200px" }}
            />
          </div>

          <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}> No of Seats Per Coach:</label>

            <input
              type="number"
              name="numberOfSeatsPerCoach"
              value={Trains.numberOfSeatsPerCoach}
              onChange={handleTseatsChange}
              required
              style={{ width: "200px" }}
            />
          </div>

          <div class="input" style={{ margin: "20px" }}>
            <label style={{ width: "150px" }}> Fare:</label>

            <input
              type="number"
              name="fare"
              value={Trains.fare}
              onChange={handleTfareChange}
              required
              style={{ width: "200px" }}
            />
          </div>

          <label>
            <button type="submit" onClick={handleSubmit}>
              Add
            </button>
          </label>

          <label>
            <button
              type="button"
              onClick={handleBack}
              style={{ borderRadius: "5px", marginLeft: "100px" }}
            >
              Back
            </button>
          </label>
        </div>
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
            style={{ justifyContent: "center", marginLeft: "169px" }}
            id="example-custom-modal-styling-title"
          >
            Train Added Successfully
          </h3>

          {/* </Modal.Title> */}
        </Modal.Header>

        <Modal.Body style={{ display: "grid" }}>
          <div>
            <p>Train Name: {Trains.name}</p>

            <p>Train Number: {Trains.train_Number}</p>

            <p>Number of Coaches: {Trains.numberOfCoach}</p>

            <p>Seats per Coach: {Trains.numberOfSeatsPerCoach}</p>

            <p>source To Destination: {Trains.sourceToDest}</p>

            <p>source To Destination Departure Time: {Trains.sourceToDestDepTime}</p>

            <p>Distance From Source: {Trains.distanceFromSource}</p>

           

            <p>Fare: {Trains.fare}</p>

            <hr />
          </div>

          <Button variant="success" onClick={() => setShow(false)}>
            Okay, Confirm
          </Button>
        </Modal.Body>
      </Modal>
      <Footer />
    </>
  );
};

export default AdminAddTrains;