import React from 'react'
import { Link } from 'react-router-dom'
import bgVideo from '../assests/bg-1.mp4'
import logo from '../assests/logo-black.png'

export default function LandingPage() {
    return (
        <>
            <div className="landing">
                <div className="bg-video">
                    <video src={bgVideo} type="video/mp4" className='landing-bg' autoPlay muted controls={false}></video>
                </div>

                <div className="landing-top">
                    <div className="logo"><Link to="/home"><img src={logo} alt="Logo" /></Link></div>
                    <Link to="/login"><div className="login-btn" id='landing-login-btn'>Log In</div></Link>
                </div>
                <div className="landing-mid">
                    <div className="landing-text">
                        <h1>Welcome To The World Of Anime</h1>
                    </div>
                    <div id="landing-enter-block">
                        <Link to="/home"><div id='landing-enter-btn'>ENTER</div></Link>
                    </div>

                </div>
            </div>
        </>
    )
}
