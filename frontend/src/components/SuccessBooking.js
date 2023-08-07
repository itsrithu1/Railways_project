import React, { useEffect,useState } from 'react';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate ,useLocation} from 'react-router-dom';




const SuccessBooking = () => {



    var flag =0;
    useEffect(()=>{
       console.log("im in useeffect");
  },[]);


  


    return (

        <>
       <h1>Hey</h1>
        </>

    );

};

export default SuccessBooking;