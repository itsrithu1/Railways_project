import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";

import { Button } from "react-bootstrap";

import { Router, useNavigate, useLocation } from "react-router-dom";

import "../styles/TrainDetails.css";

import NavbarComponent from "../components/NavbarComponent";

import Footer from "../components/Footer";

const DisplayTrains = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTrainNumber, setSelectedTrainNumber] = useState(null);

  const [showMessage, setShowMessage] = useState(false);
  const handleRadioChange = (event) => {
    setSelectedTrainNumber(event.target.value);
  };

  const handleSubmit = () => {
    // window.location.href='./displaytrains'

    if (selectedTrainNumber) {
      navigate(
        `/bookingPassengerDetails?train_Number=${selectedTrainNumber}&date=${date}`
      );
    } else {
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 1500);
    }
  };

  const handleRowClick = (event, trainNumber) => {
    setSelectedTrainNumber(trainNumber);
  };

  const [trainData, setTrainData] = useState();

  const [source, setSource] = useState();

  const [destination, setDestination] = useState();

  const [date, setDate] = useState();

  const displayTrainDetails = () => {
    try {
      fetch(
        `http://localhost:3001/api/v1/user/searchTrainNew?source=${source}&destination=${destination}&date=${date}`,
        {
          method: "GET",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accesss-Control-Allow-Origin": "*",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("recieved data is", data.data);
          if (data.flag == "OK") {
            setTrainData(data.data);
          } else {
            // alert("No Trains Found")
          }
        });
    } catch (err) {
      console.error("Error:", err);
    }
    // console.log(source,destination,date)
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSource(queryParams.get("source"));
    setDestination(queryParams.get("destination"));
    const parts = queryParams.get("date").split("-");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    setDate(formattedDate);
    displayTrainDetails();
  }, [date]);

  return (
    <>
      <NavbarComponent />

      <div className="page-container">
        <div
          className="content-box train-details-container"
          style={{ color: "black" }}
        >
          <h2>Train Details</h2>

<<<<<<< HEAD
          <p>
            <b>Source: {source}</b>
          </p>

          <p>
            <b>Destination: {destination}</b>
          </p>

          <p>
            <b>Date: {date}</b>
          </p>

          <table>
            <thead>
              <tr>
                <th>Book This?</th>

                <th>Train No.</th>

                <th>Train Name</th>

                <th>Departure Time</th>
=======
    

      
      <div className='train-details-top-container'>
      <div className='header-item'>
              <div className='header-label'>Source:</div>
              <div className='header-value'>{source}</div>
            </div>
            <div className='header-item'>
              <div className='header-label'>Destination:</div>
              <div className='header-value'>{destination}</div>
            </div>
            <div className='header-item'>
              <div className='header-label'>Date:</div>
              <div className='header-value'>{date}</div>
            </div>
            <Button variant='link' onClick={() => navigate(`/modifyDetails`)}>
              Modify
            </Button>
          </div>
          

          <div className='page-container'>
          <div className="content-box train-details-container">

          <h2>Train Details</h2>
>>>>>>> 383961bbbbe55f83a328023cea11fc4c31fff680

                <th>Arrival Time</th>

                <th>Fare</th>

                <th>Seats Available</th>
              </tr>
            </thead>

            <tbody>
              {trainData &&
                trainData.map((train, index) => (
                  <tr
                    key={index}
                    onClick={(event) =>
                      handleRowClick(event, train.train_Number)
                    }
                  >
                    <td>
                      <Form.Check
                        type="radio"
                        name="TrainBooking"
                        id={`Train${index + 1}`}
                        value={train.train_Number}
                        checked={selectedTrainNumber === train.train_Number}
                        onChange={handleRadioChange}
                        required
                      />
                    </td>

                    <td>{train.train_Number}</td>

                    <td>{train.name}</td>

                    <td>{train.departure_time}</td>

                    <td>{train.arrival_time}</td>

                    <td>{train.fare}</td>

                    <td>{train.totalSeatsAvailable}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div style={{ opacity: "100%" }}>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              style={{ opacity: "100%" }}
            >
              Submit
            </Button>
          </div>

<<<<<<< HEAD
          {showMessage && (
            <p style={{ color: "red" }}>Please select a train.</p>
          )}
        </div>
      </div>

      <Footer />
=======
        </thead>

        <tbody>

 

          {trainData && trainData.map((train, index) => (

            <tr key={index}

            onClick={(event) => handleRowClick(event, train.train_Number)}>

              <td>

              <Form.Check

                  type="radio"

                  name="TrainBooking"

                  id={`Train${index + 1}`}

                  value={train.train_Number}

                  checked={selectedTrainNumber === train.train_Number}

                  onChange={handleRadioChange}
                  required

                />

              </td>

              <td>{train.train_Number}</td>

              <td>{train.name}</td>

              <td>{train.departure_time}</td>

              <td>{train.arrival_time}</td>

              <td>{train.fare}</td>

              <td>{train.totalSeatsAvailable}</td>

            </tr>

          ))}

        </tbody>

      </table>

 

      <Button variant="primary" type="submit" onClick={handleSubmit} >

        Submit

      </Button>

      {showMessage && <p style={{ color: 'red' }}>Please select a train.</p>}

    </div>

    </div>
  

    <Footer/>

>>>>>>> 383961bbbbe55f83a328023cea11fc4c31fff680
    </>
  );
};

export default DisplayTrains;
