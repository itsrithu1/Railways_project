//sign in
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";
import { NavLink, useNavigate } from "react-router-dom";

const LOGIN_URL = "./auth";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const userRef = useRef(); // user input
  const errRef = useRef(); //error

  const [user, setUser] = useState(""); //input

  const [pwd, setPwd] = useState(""); //password

  const [errMsg, setErrMsg] = useState(""); //error
  const [success, setSuccess] = useState(false); //can remove later to route to diff page

  useEffect(() => {
    //nothing in dependency
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accesss-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          user,
          pwd,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("recieved data is", data);

          if (data.data == "Logged in as User") {
            setUser("");
            setPwd("");
            setSuccess(true);
            navigate("/LandingPage");
          }else if(data.data =="Logged in as Admin"){
            navigate("/AdminHomePage");
          } 
          else {
            // Handle unsuccessful login response here
            if (data.status_code === 400) {
              setErrMsg("not a valid email");
            } else if (data.status_code === 401) {
              setErrMsg("unauthorized");
            } else {
              setErrMsg("login failed");
            }
          }
        });
    } catch (err) {
      console.error("Error:", err);
      setErrMsg("An error occurred during login");
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <p>
            <NavLink to="/LandingPage"></NavLink>
          </p>
        </section>
      ) : (
        <div className="div">
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>{" "}
            {/*assertive allows ro reach msg immediately*/}
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <br />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <br />

              <button
                className="button"
                type="submit"
                // onClick={handleSignIn}
              >
                Sign In
              </button>

              {/* <div className="button">
                                <button >
                                    <div class="svg-wrapper-1">
                                        <div class="svg-wrapper">
                                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor\"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <p>Sign In</p>
                                </button>
                            </div> */}
            </form>
            <p>
              Need an Account?
              <br />
              <span className="line">
                {/*put router link here */}
                {/* <a href="src\Register.js">Sign Up</a> */}
                <NavLink to="/Register">Sign Up</NavLink>
              </span>
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Login;

// // import { useRef, useState, useEffect, useContext } from "react";
// // import AuthContext from "./context/AuthProvider";
// // import axios from "./api/axios";
// // import { NavLink, useNavigate } from "react-router-dom";

// // const LOGIN_URL = './auth';
// // const Login = () => {
// //     const { setAuth } = useContext(AuthContext);
// //     const navigate = useNavigate();

// //     const userRef = useRef();
// //     const errRef = useRef();

// //     const [user, setUser] = useState('');
// //     const [pwd, setPwd] = useState('');
// //     const [errMsg, setErrMsg] = useState('');
// //     const [success, setSuccess] = useState(false);

// //     useEffect(() => {
// //         userRef.current.focus();
// //     }, []);

// //     useEffect(() => {
// //         setErrMsg('');
// //     }, [user, pwd]);

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const response = await fetch("http://localhost:3001/api/v1/user/login", {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                     Accept: "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                     user,
// //                     pwd
// //                 }),
// //             });
// //             const data = await response.json();

// //             if (data.flag === "OK") {
// //                 setUser("");
// //                 setPwd("");
// //                 setSuccess(true);
// //                 console.log({success});
// //             } else {
// //                 // Handle unsuccessful login response here
// //                 if (data.status_code === 400) {
// //                     setErrMsg("Not a valid email");
// //                 } else if (data.status_code === 401) {
// //                     setErrMsg("Unauthorized");
// //                 } else {
// //                     setErrMsg("Login failed");
// //                 }
// //             }
// //         } catch (err) {
// //             console.error("Error:", err);
// //             setErrMsg("An error occurred during login");
// //             errRef.current.focus();
// //         }
// //     };

// //     const handleSignIn = () => {
// //         if (success) {
// //             console.log("in in success");
// //             navigate('/LandingPage');
// //         } else {
// //             setErrMsg("Please enter valid credentials");
// //         }
// //     };

// //     return (
// //         <>
// //             <div className="div">
// //                 <section>
// //                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
// //                     <h1>Sign In</h1>
// //                     <form onSubmit={handleSubmit}>
// //                         <label htmlFor="username">Username:</label>
// //                         <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />
// //                         <br />
// //                         <label htmlFor="password">Password:</label>
// //                         <input type="password" id="password" autoComplete="off" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
// //                         <br />
// //                         <button className="button" type="submit">Sign In</button>
// //                     </form>
// //                     <p>
// //                         Need an Account?<br />
// //                         <span className="line">
// //                             <NavLink to="/Register">Sign Up</NavLink>
// //                         </span>
// //                     </p>
// //                 </section>
// //             </div>
// //         </>
// //     );
// // };

// // export default Login;

// import React, { useState } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';

// const Login = () => {

//     const history = useNavigate();

//     const [inpval, setInpval] = useState({
//         text: "",
//         password: ""
//     })

//     // const [data, setData] = useState([]);
//     console.log(inpval);

//     const getdata = (e) => {
//         // console.log(e.target.value);

//         const { value, name } = e.target;
//         // console.log(value,name);

//         setInpval(() => {
//             return {
//                 ...inpval,
//                 [name]: value
//             }
//         })

//     }

//     const addData = (e) => {
//         e.preventDefault();

//         // const getuserArr = localStorage.getItem("useryoutube");
//         // console.log(getuserArr);

//         //fastAPI backend using axios

//         const { email, password } = inpval;

//         let myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//         myHeaders.append("Access-Control-Allow-Origin", "*");

//         console.log(myHeaders);
//         const data = new URLSearchParams();
//         data.append("username", inpval.text);
//         data.append("password", inpval.password);
//         console.log(data);

//         fetch("http://127.0.0.1:8000/login", data, {
//             headers: {
//                 "Content-Type": "application/json",
//                  Accept: "application/json",
//             "Accesss-Control-Allow-Origin": "*",
//             },
//              body: JSON.stringify({
//              user,
//             pwd
//         })
//                   .then((res) => res.json())

//             .then((res) => {
//                 console.log(res.data);

//                 if (email === "") {
//                     toast.error('email field is requred', {
//                         position: "top-center",
//                     });
//                     // } else if (!email.includes("@")) {
//                     //     toast.error('plz enter valid email addres', {
//                     //         position: "top-center",
//                     //     });
//                 } else if (password === "") {
//                     toast.error('password field is requred', {
//                         position: "top-center",
//                     });
//                 } else if (password.length < 5) {
//                     toast.error('password length greater five', {
//                         position: "top-center",
//                     });
//                 }else if(res.data === "invalid details") {
//                     toast.error('empty/invalid details', {
//                         position: "top-center",
//                     });
//                 }else {
//                     toast.success('login successfully', {
//                         position: "top-center",
//                     });
//                     localStorage.setItem("access_token", res.data.access_token)
//                     history('/details');
//                 }

//             }
//             )
//             .catch((err) => {
//                 console.log(err);
//                 toast.error('Empty Details', {
//                     position: "top-right",
//                 });
//             })

//     }

//     return (
//         <>
//             <ToastContainer />
//             <div className="container mt-3">
//                 <section className='d-flex justify-content-between'>
//                     <div className="left_data mt-4 p-3" style={{ height: "100%", marginLeft: 75 }}>
//                         <h3 className='text-center col-lg-20'>Sign In</h3>
//                         <br></br>
//                         <Form  >

//                             <Form.Group className="mb-4 col-lg-29" controlId="formBasicEmail">

//                                 <Form.Control type="text" name='text' onChange={getdata} placeholder="Enter username" autoComplete="off" />
//                             </Form.Group>

//                             <Form.Group className="mb-4 col-lg-29" controlId="formBasicPassword">

//                                 <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" autoComplete="off" />
//                             </Form.Group>
//                             <br></br>

//                             <Button variant="primary" className='col-lg-50 d-flex justify-content-center' onClick={addData} style={{ background: "black", width: 100, marginLeft: 50, borderRadius: 5,  }} type="submit">
//                                 <div style={{ color: "#FFF" }} > SIGN IN </div>
//                             </Button>
//                         </Form>
//                         <br></br>
//                         <p className='text-center col-lg-17'>Dont have an account ?  <NavLink to="/register">Sign Up</NavLink></p>
//                     </div>
//                     <div className="position-fixed top-50 start-100 translate-middle" style={{ maxwidth: 50, position: "left" }}>
//                         <img src="https://www.allen.ac.in/ace2223/assets/images/login.png" style={{ maxWidth: 800, marginRight: 750 }} alt="" />
//                     </div>
//                 </section>

//             </div>
//         </>
//     )
// }

// export default Login;
