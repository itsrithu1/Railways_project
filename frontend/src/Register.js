import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";
import "./styles/register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9- ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";
const Register = () => {
  const userRef = useRef(); //user input
  const errRef = useRef(); //error

  const navigate = useNavigate();

  const [user, setUser] = useState(""); //input
  const [validName, setValidName] = useState(false); //name validates
  const [userFocus, setUserFocus] = useState(false);

  //phone no
  const [number, setNo] = useState(""); //input
  const [validNo, setValidNo] = useState(false); //name validates
  const [noFocus, setNoFocus] = useState(false);

  //email
  const [email, setEmail] = useState(""); //input
  const [validEmail, setValidEmail] = useState(false); //name validates
  const [emailFocus, setEmailFocus] = useState(false);

  //passowrd
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    //no
    const result = USER_REGEX.test(number);
    console.log(result);
    console.log(number);
    setValidNo(result);
  }, [number]);

  const handleRegister = ()=> {
    navigate('/SignIn')
}
  useEffect(() => {
    //email
    // const result = USER_REGEX.test(email);
    console.log(email);
    console.log(email);
    
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd; //confirmation
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handlePhoneNumberChange = (e) => {
    var value = e.target.value;
    // Remove any non-digit characters from the input
    const cleanedValue = value.replace(/\D/g, '');
  var result = value.length;
    // Check if the cleanedValue has exactly 10 digits
    if (value.length < 10) {
      setNo(value);
      setValidNo(false);
    }
      
    else if(value.length == 10) {
      setValidNo(true);
    }
    else {
      setValidNo(false);
    }
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    console.log({setValidEmail})
    setEmail(value);
    // Check if the input contains the "@" symbol
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const matches = pattern.test(value);
    setValidEmail(matches); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("invalid entry");
      return;
    }
    try {

      fetch("http://localhost:3001/api/v1/user/create", {
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
             email,
             number
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("recieved data is",data)
            
    
            if (data.status_code==200) {
                    setUser("");
                    setPwd("");
                    setEmail("")
                    setNo("")
                    setSuccess(true);
                  } else {
                    // Handle unsuccessful login response here
                    if (data.status_code === 202) {
                      setErrMsg(data.message);
                    } else if (data.status_code === 401) {
                      setErrMsg("unauthorized");
                    } else {
                      setErrMsg("login failed");
                    }
                }
    
            });

    
    } catch (err) {
      if (!err?.response) {
        setErrMsg("noserver response");
      } else if (err.response?.status === 409) {
        setErrMsg("username taken");
      } else {
        setErrMsg("registration failed");
      }
      errRef.current.focus();
    }
    //console.log(user,pwd);
    //setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Sucess!</h1>
          <p>
            <NavLink to="/SignIn">Sign In</NavLink>
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
            </p>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "true" : "false"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />

              <label htmlFor="phoneno">
                PhoneNo:
                <span className={validNo ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validNo || !number ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="number"
                id="phoneno"
                ref={userRef}
                autoComplete="off"
                onChange={handlePhoneNumberChange}
                required
                aria-invalid={validNo ? "true" : "false"}
                aria-describedby="uidnoteno"
                onFocus={() => setNoFocus(true)}
                onBlur={() => setNoFocus(false)}
              />

              <label htmlFor="email">
                Email:
                <span className={validEmail? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="email"
                id="email"
                ref={userRef} 
                autoComplete="off"
                onChange={handleEmailChange}
                required
                aria-invalid={validEmail ? "true" : "false"}
                aria-describedby="uidnoteemail"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />

             


              <label htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
             

              <p
                id="uidnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscren"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <span className="info-text">
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </span>
              </p>

              <label htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
             
              <div className="button">
                <button onClick={handleRegister}
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Sign Up</span>
                </button>
              </div>
            </form>

            <p>
              {" "}
              Already have an account?
              <span>
                <NavLink to="/SignIn">Sign In</NavLink>
              </span>
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Register;
