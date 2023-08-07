import React, { useEffect,useState } from 'react';
import "../styles/bookingDetails.css";
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate ,useLocation} from 'react-router-dom';
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
const shortid = require('shortid')
// import { useHistory } from 'react-router-dom';



const BookingPassengerDetails = () => {

  const location =useLocation()

  // var farePerTicket = 100; // Set the fare per ticket

  const [passengers, setPassengers] = useState([
    {
      name: '',
      dob: '',
      gender: '',
      phone: null,
      travelInsurance: 'no',
      foodPreferences: 'no',
    },
  ]);
  // const [ticket_id, setticket_id] = useState();

 

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
        dob: '',
        gender: '',
        phone: '',
       
        travelInsurance: 'no',
        foodPreferences: 'no',
      },
    ]);
    setIsFormValid(true);
  };

  const getMaxDate = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 5);
    return currentDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };
  

  const [trainNumber,setTrainNumber]=useState(null)
  const [date,setdate]=useState(null)
  const [name, setName] = useState('First Class')

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  
  const __DEV__ = document.domain === 'localhost'


  
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
    
  
  
  
  const calculateTotalFare = () => {
  const numberOfPassengers = passengers.length;
  return numberOfPassengers * farePerTicket;
};

  const printinconsole = () => {
    console.log({passengers})
  }

 
  

  const handleConfirm = () => {
    
    console.log("Im in handleConfirm");
    console.log(passengers);

    
        try {
            
            fetch(`http://localhost:3001/api/v1/passenger/addPassenger?train_Number=${trainNumber}&date=${date}`, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accesss-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            passengers
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            
            if(data.flag=="OK"){
              alert("Seat Booked Successfully")
            }
            if(data.flag == "Not created"){
              alert("No Seats Available")
            }
    
            });
    
    
     
        } catch (err) {
          console.error("Error:", err);
          
        }

        Navigate('/successBooking');


  };


  async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    const passengersData = JSON.stringify(passengers); // Encode the passengers data


		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:3001/api/v1/payment', { method: 'POST' }).then((t) =>
			t.json()
		)

    const options = {
			key: __DEV__ ? 'rzp_test_fgWk4ynD9HVS0a' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'First Class',
			description: 'Thank you for using our service',
			image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/%D0%9F%D0%BE%D0%B5%D0%B7%D0%B4_%D0%BD%D0%B0_%D1%84%D0%BE%D0%BD%D0%B5_%D0%B3%D0%BE%D1%80%D1%8B_%D0%A8%D0%B0%D1%82%D1%80%D0%B8%D1%89%D0%B5._%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C.jpg/1200px-%D0%9F%D0%BE%D0%B5%D0%B7%D0%B4_%D0%BD%D0%B0_%D1%84%D0%BE%D0%BD%D0%B5_%D0%B3%D0%BE%D1%80%D1%8B_%D0%A8%D0%B0%D1%82%D1%80%D0%B8%D1%89%D0%B5._%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C.jpg',
			// callback_url: `http://localhost:3000/SuccessBooking?passengers=${passengersData}&train_Number=${trainNumber}`,
			handler: function(response){
        // console.log("This is added after successful payment");
        handleConfirm();
      },
      prefill: {
				name,
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			},
      
		}
		const paymentObject = new window.Razorpay(options)
    

		const result = paymentObject.open()

    console.log("Payment started");
    console.log(result);
    // handleConfirm();
   
	}


    // 


    // const hasEmptyFields = passengers.some((passenger) =>
    //   Object.values(passenger).some((value) => value === null || value === '')
    // );

    // if (hasEmptyFields) {
    //   setIsFormValid(false);
    // } else {
    //   setIsFormValid(true);
      // setShowModal(true);
    // }
  

  
    
  

  const handleDeletePassenger = (index) => {

    setPassengers((prevPassengers) => {

      const updatedPassengers = prevPassengers.filter((_, i) => i !== index);

      return updatedPassengers;

    });

  };

  const [farePerTicket ,setFarePerTicket] = useState(null)

  const getFarePrice = () =>{

    try {
            
      fetch(`http://localhost:3001/api/v1/user/getfare?train_Number=${trainNumber}`, {
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
    const queryParams= new URLSearchParams(location.search);
    setTrainNumber( queryParams.get("train_Number"))
    setdate( queryParams.get("date"))

    
  }, []);

 

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

            <View key={index} style={styles.passenger}>

              <Text>Name: {passenger.name}</Text>

              <Text>Dob: {passenger.dob}</Text>

              <Text>Gender: {passenger.gender}</Text>

              <Text>Phone No: {passenger.phone}</Text>

              {/* <Text>Email ID: {passenger.email}</Text> */}

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
      <form >
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Name</th>
              <th>Dob</th>
              <th>Gender</th>
              <th>Phone No</th>
            
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
                    type="date"
                    name="dob"
                    value={passenger.date}
                    onChange={(e) => handleChange(index, e)}
                    required
                    max={getMaxDate()}
                  />
                  
                </td>
                <td>
                  <select
                    name="gender"
                    value={passenger.gender}
                    onChange={(e) => handleChange(index, e)}
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    name="phone"
                    pattern="[0-9]{10}"
                    value={passenger.phone}
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
                      //checked={passenger.travelInsurance === 'no'}
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
                      //checked={passenger.foodPreferences === 'no'}
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
                <td>
                  <Button variant="danger" onClick={() => handleDeletePassenger(index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {!isFormValid && <p style={{ color: 'red' }}>Please fill in all the required details before proceeding.</p>} */}
        

        <button  onClick={handleSubmit} style={{borderRadius:'5px'}}>Proceed</button>

        <button type="button" onClick={handleAddPassenger} style={{borderRadius:'5px',width:'120px'}}>
          Add Passenger
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
          <p><b>Total Fare: Rs. {calculateTotalFare()} </b></p>
          <hr />

          <Button variant="secondary" onClick={handleCloseModal}>

            Back

          </Button>

          <Button variant="success" onClick={handleConfirm}>

            Pay Now

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
