import React, { useEffect,useState } from 'react';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate ,useLocation} from 'react-router-dom';




const SuccessBooking = () => {

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const passengersData = queryParams.get('passengers');
  const passengers = JSON.parse(decodeURIComponent(passengersData));
  const train_NumberDate = queryParams.get('train_Number');
  const trainNumber = JSON.parse(decodeURIComponent(train_NumberDate));

    var flag =0;
    useEffect(()=>{
       flag++;
       console.log({flag});
       if(flag ==1)
       {
        handleConfirm();
                console.log("Im in");
       }
  },[]);


  const handleConfirm = () => {

    
    console.log(passengers);

    
        try {
            
            fetch(`http://localhost:3001/api/v1/passenger/addPassenger?train_Number=${trainNumber}`, {
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
    
            });
    
    
     
        } catch (err) {
          console.error("Error:", err);
          
        }


  };


    return (

        <>
       <h1>Hey</h1>
        </>

    );

};

export default SuccessBooking;