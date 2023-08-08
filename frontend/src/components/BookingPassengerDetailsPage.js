import React, { useEffect, useState, useRef } from "react";
import "../styles/bookingDetails.css";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
const shortid = require("shortid");

// import { useHistory } from 'react-router-dom';

const BookingPassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pdfLinkRef = useRef();

  // var farePerTicket = 100; // Set the fare per ticket

  const [passengers, setPassengers] = useState([
    {
      name: "",
      dob: "",
      gender: "",
      phone: null,
    },
  ]);


 

const [showPDFLink, setshowPDFLink] = useState(false);
  const [trainNumber,setTrainNumber]=useState(null)
  const [date,setdate]=useState(null)
  const [name, setName] = useState('First Class')
  const [source,setsource]=useState(null)
  const [destination,setdestination]=useState(null)
  var razorpayFare =0;

  const handlePrintNow = () => {
    setshowPDFLink(true);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    // const newValue = type === 'radio' ? (checked ? value : 'no'): value;
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
        name: "",
        dob: "",
        gender: "",
        phone: null,
      },
    ]);
    setIsFormValid(true);
  };

  const getMaxDate = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 5);
    return currentDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const __DEV__ = document.domain === "localhost";

  const [isFormValid, setIsFormValid] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormValid(true);
    setShowModal(true);

    getFarePrice();
    // const hasEmptyFields = passengers.some((passenger) =>
    //   Object.values(passenger).some((value) => value === null || value === '')
    // );

    // if (hasEmptyFields) {
    //   setIsFormValid(false);
    // } else {
    //   setIsFormValid(true);
    //   setShowModal(true);
    // }
  };

  const handleInputChange = (index, e) => {
    // ... (existing handleChange logic)

    // When a field is updated, we mark the form as valid
    setIsFormValid(true);
  };

  const [seatNumber,setSeatNumber]=useState()

  const calculateTotalFare = () => {
  const numberOfPassengers = passengers.length;
  var conveniencefee = numberOfPassengers*20;
  var fareprice = (numberOfPassengers * farePerTicket)+conveniencefee;
  razorpayFare= fareprice;
  console.log({razorpayFare});
  
  return fareprice;
};

  const printinconsole = () => {
    console.log({ passengers });
  };

  const handleConfirm = () => {
    console.log("Im in handleConfirm");
    console.log(passengers);

    try {
      fetch(
        `http://localhost:3001/api/v1/passenger/addPassenger?train_Number=${trainNumber}&date=${date}`,
        {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accesss-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            passengers,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          if (data.message == "seat booked") {
           
            setSeatNumber(data.data)
            handlePrintNow();
            // navigate("/successBooking");
          }
          if (data.flag == "Not created") {
            alert("No Seats Available");
          }
        });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    const passengersData = JSON.stringify(passengers); // Encode the passengers data

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

		const data = await fetch(`http://localhost:3001/api/v1/payment?amount=${razorpayFare}`, { method: 'POST' }).then((t) =>
			t.json()
		)

    const options = {
      key: __DEV__ ? "rzp_test_fgWk4ynD9HVS0a" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "First Class",
      description: "Thank you for using our service",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/%D0%9F%D0%BE%D0%B5%D0%B7%D0%B4_%D0%BD%D0%B0_%D1%84%D0%BE%D0%BD%D0%B5_%D0%B3%D0%BE%D1%80%D1%8B_%D0%A8%D0%B0%D1%82%D1%80%D0%B8%D1%89%D0%B5._%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C.jpg/1200px-%D0%9F%D0%BE%D0%B5%D0%B7%D0%B4_%D0%BD%D0%B0_%D1%84%D0%BE%D0%BD%D0%B5_%D0%B3%D0%BE%D1%80%D1%8B_%D0%A8%D0%B0%D1%82%D1%80%D0%B8%D1%89%D0%B5._%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C.jpg",
      // callback_url: `http://localhost:3000/SuccessBooking?passengers=${passengersData}&train_Number=${trainNumber}`,
      handler: function (response) {
        // console.log("This is added after successful payment");
        handleConfirm();
      },
      prefill: {
        name,
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);

    const result = paymentObject.open();

    console.log("Payment started");
    console.log(result);
    // handleConfirm();
  }

  const handleDeletePassenger = (index) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = prevPassengers.filter((_, i) => i !== index);

      return updatedPassengers;
    });
  };

  const [farePerTicket, setFarePerTicket] = useState(null);

  const getFarePrice = () => {
    try {
         console.log(source,destination);   
      fetch(`http://localhost:3001/api/v1/user/getfare?train_Number=${trainNumber}&date=${date}&source=${source}&destination=${destination}`, {
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
      
      if(data.flag=="OK"){
        console.log("fare is ",data.data)
        setFarePerTicket(data.data)
      }

      });



  } catch (err) {
    console.error("Error:", err);
    
  }


  }

  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setTrainNumber(queryParams.get("train_Number"));
    setsource(queryParams.get("source"));
    setdestination(queryParams.get("destination"));
    setdate(queryParams.get("date"));

    console.log("source is ",queryParams.get("source"))
  }, [location ]);

 

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const handleClose=()=>{
  //   navigate('/LandingPage')
  // }

  const PDFDocument = ({ passengers }) => {
    return (
      <Document>
        <Page style={styles.page}>
          {passengers.map((passenger, index) => (

            <View style={styles.section}>
        <Text style={styles.header}>Train Ticket</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Passenger Name:</Text>
          <Text style={styles.value}>{passenger.name}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{passenger.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>DOB:</Text>
          <Text style={styles.value}>{passenger.dob}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{passenger.phoneNo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Train Number:</Text>
          <Text style={styles.value}>{trainNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Source:</Text>
          <Text style={styles.value}>{source}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Destination:</Text>
          <Text style={styles.value}>{destination}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Seat Number:</Text>
          <Text style={styles.value}>{seatNumber}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Indian Railways Passenger Reservation System (PRS) GuideTextnes:</Text>
          <Text>
            <Text>Ticketing and Booking Timings: The system should adhere to the designated timings for the opening of booking for different classes of travel. It should also consider the timing for Tatkal bookings and Premium Tatkal bookings, which are available a day in advance.</Text>
            <Text>Quota System: The reservation system should incorporate the various quotas available for different categories of passengers, such as General Quota, Ladies Quota, Senior Citizen Quota, and others. These quotas allocate a certain number of seats to specific passenger categories.</Text>
            <Text>Payment Gateway CompTextance: The payment processing system should adhere to the Payment Card Industry Data Security Standard (PCI DSS) to ensure the secure handTextng of credit/debit card information.</Text>
          </Text>
        </View>
        
      </View>


          ))}
        </Page>
      </Document>
    );
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#F0F0F0',
      padding: 30,
      fontSize: 12,
    },
    section: {
      marginBottom: 15,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textATextgn: 'center',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    value: {
      marginBottom: 10,
      borderBottom: '1pt soTextd black',
    },
    footer: {
      textATextgn: 'center',
      fontSize: 10,
      marginTop: 10,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 5,
    },
  });

  return (
    <>
      <NavbarComponent />



      <div className="outsidebpd">

<div className="cardbpd">

  <div className="tdetails-bpd">

  <h1 className="name-bpd">Shatabdi Express</h1>

      <h6 className="tnum-bpd">#12052</h6>

  </div>



  <div className="ttimeoutsidebpd">

  <div className="ttimebpd">

      <h3 className="timebpd">10:10, 04 Sept</h3>

      <div className="linebpd"></div>

      <h3 className="timebpd" >11h 33mins</h3>

      <div className="linebpd"></div>

      <h3 className="timebpd">09:43, 04 Sept</h3>                

      </div>



      <div className="stationbpd">

          <h6>Margao</h6>

          <h6>Thane</h6>

      </div>

  </div>

</div>  





<div className="paymentbpd">

     

      <div className="detailsbpd">

          <h5>Gst (Inc)</h5>

          <h5>18%</h5>

      </div>

      <div className="detailsbpd">

          <h5>convinence Fee</h5>

          <h5>rs 20</h5>

      </div>



          <div className="paynowColor">

      <div className="linebpd"></div>

      <button className="paybpd"><span className="paynowbpd">Pay Now</span></button>

      </div>

  </div>



</div>



      <form>

      <table className="table table-bordered table-striped table-custom-width">
        <thead className="thead-dark">
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Dob</th>
            <th>Gender</th>
            <th>Phone No</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={passenger.name}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={passenger.date}
                  onChange={(e) => handleChange(index, e)}
                  required
                  max={getMaxDate()}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  name="gender"
                  value={passenger.gender}
                  onChange={(e) => handleChange(index, e)}
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  pattern="[0-9]{10}"
                  value={passenger.phone}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePassenger(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          {/* {!isFormValid && <p style={{ color: 'red' }}>Please fill in all the required details before proceeding.</p>} */}
          
          <button
            type="button"
            onClick={handleAddPassenger}
            className="addpass-button"
            // style={{ borderRadius: "5px", width: "120px", marginLeft: "540px",whiteSpace: "nowrap",textAlign: "center"  }}
          >
            Add Passenger
          </button>

          <button
            onClick={handleSubmit}
            style={{ borderRadius: "5px", width: "100px", margin: "0 auto"}}
          >
            Proceed
          </button>

         
        
      </form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Passenger Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {passengers.map((passenger, index) => (
            <div key={index}>
              <p>Name: {passenger.name}</p>

              <p>Phone No: {passenger.phone}</p>

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

          <hr />
          <p>
            <b>Total Fare: Rs. {calculateTotalFare()} </b>
          </p>
          <hr />

          <Button variant="secondary" onClick={handleCloseModal}>
            Back
          </Button>

          <Button variant="success" onClick={displayRazorpay}>
            Pay Now
          </Button>
          {showPDFLink && (
            <PDFDownloadLink
              document={<PDFDocument passengers={passengers} />}
              fileName="Ticket.pdf"
              id="Printnow"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Print Now"
              }
            </PDFDownloadLink>
          )}
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default BookingPassengerDetails;
