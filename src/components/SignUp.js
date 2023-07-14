import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assests/logo-black.png'
import googleLogo from '../assests/google-logo.png'
import fbLogo from '../assests/fb-logo.png'
import { useState , useEffect } from 'react'
// import Navbar from './Navbar'

export default function SignUp(props) {
  const { signupData , setSignupData } = props
  const [passwordState, setPasswordState] = useState("hidden")
  const showPassword = () => {
    document.getElementById("signup-password").type = "text"
    setPasswordState("visible")
  }
  const hidePassword = () => {
    document.getElementById("signup-password").type = "password"
    setPasswordState("hidden")
  }
  const saveSignupData = (e)=>{           // Use onChange Later
    e.preventDefault();
     setSignupData({
      'name': document.getElementById('signup-name').value,
      'email': document.getElementById('signup-email').value,
      'password': document.getElementById('signup-password').value
    })
    console.log(signupData)
  }
  useEffect(() => {
    //change it later - TO DO
    document.getElementById('signup-container').style.display = 'block';
  }, [])

  document.title = "AOKi - Sign Up";

  return (
    <>
      <div className="container" id='signup-container'>
        {/* <Navbar/> */}
        <div id="signup-outer-container">
          <div className="top-bar">
            <div className="logo top-bar-left"><Link to="/home"><img src={logo} alt="Logo" /></Link></div>
            <div className="top-bar-right">
              <p>Already Have An Account?</p>
              <Link to="/login"><div className="login-btn" id='signup-login-btn'>Log In</div></Link>
            </div>
          </div>
          <div id="signup-inner-container">
            <div className="mobile-top-signup-login">
              <div className="logo"><Link to="/home"><img src={logo} alt="Logo" /></Link></div>
              <div className="mobile-top-bar-right">
              <p>Already Have An Account?</p>
              <Link to="/login"><div className="login-btn" id='signup-login-btn'>Log In</div></Link>
            </div>
            </div>
            <h2>Create An Account</h2>
            <div id="third-party-signup-btn">
              <div className="google-btn third-party-btn" id="google-signup-btn">
                <img src={googleLogo} alt="Google" />
                <p>Signup With Google</p>
              </div>
              <div className="fb-btn third-party-btn" id="fb-signup-btn">
                <img src={fbLogo} alt="Facebook" />
                <p>Signup With Facebook</p>
              </div>
            </div>
            <div id="or-signup-text">
              <div className="or-sideline" id='or-sideline-left'></div>
              <p>OR</p>
              <div className="or-sideline" id='or-sideline-right'></div>
            </div>
            <div id="signup-form">
              <div>
                <input type="text" id="signup-name" placeholder='Full Name' />
                <p className="warnings">test warning</p>
              </div>
              <div>
                <input type="email" name="userEmail" id="signup-email" placeholder='Email ID' />
                <p className="warnings">test warning</p>
              </div>
              <div>
                <input type="password" name="userPassword" id="signup-password" placeholder='Password' />
                <i className={`fa-solid fa-eye-slash eye-slash ${passwordState === "hidden" ? "" : "hide"}`} style={{ color: '#b6bfce' }} onClick={showPassword}></i>
                <i className={`fa-solid fa-eye eye ${passwordState === "visible" ? "" : "hide"}`} style={{ color: '#b6bfce' }} onClick={hidePassword}></i>
                <p className="warnings">test warning</p>
              </div>
              <input type="submit" value="Create Account" onClick={saveSignupData}/>
            </div>
            <div id="terms-box">
              <p>By continuing you will agree to our <Link to='/terms-conditions'>Terms and Conditions.</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
