//import { Card, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import './Home.css';
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import dance from './danceclub.jpg';
import singing from './singingclub.jpg';
import eco from './ecofriendly.jpg';

const Home = () => {
    const [email,setEmail]=useState("")
    const [otpVerify,setOtpVerify]=useState("")
    const [redirectToSignup, setRedirectToSignup] = useState(false);


    const scrollToDownloadSection = () => {
        const downloadSection = document.getElementById('download-section');
        if (downloadSection) {
            downloadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    function sendOtp(){
        axios.post("http://localhost:8080/send-otp",{email})
            .then((res)=>{
                console.log(res)
                if(res.status===201)
                    alert(res.data.message)
            })
    }
    
    const verifyOtp = () => {
        axios.post("http://localhost:8080/verify-otp", { email, enteredOTP:otpVerify })
            .then((res) => {
                console.log(res);
                if(res.data.match === "success") {
                    setRedirectToSignup(true);
                }
            })
            .catch(error => {
                console.error('Error verifying OTP:', error)
                alert("Incorrect otp")
            });
    };

    if (redirectToSignup) {
        return <Navigate to="/signuppage" />;
    }
    
    return (
        <div>
            <div className="container">
                <div className="content">
                    <div>
                        <span>discover</span>
                        <h1>CLUB NEXUS</h1>
                        <hr />
                        <p>Foster Campus Unity: Connecting Clubs cultivates seamless collaboration and vibrant community engagement, enhancing the college experience for all.</p>
                        <button onClick={scrollToDownloadSection}>Join Us</button>
                    </div>
                </div>
                <div className="images">
                    <img src={dance} alt="1" className=" image-1" />
                    <img src={singing}alt="2" className=" image-2" />
                    <img src="https://thumbs.dreamstime.com/b/eco-friendly-concept-20601171.jpg" alt="3" className=" image-3" />
                </div>
            </div>
            <div id="download-section" className="download-section m-5">
                <div className="container " >
                    <div className="form-container">
                        <h2>Enter your college Mail</h2>
                        
                            <div className="form-group mb-3">
                                <label htmlFor="email">Enter your email:</label>
                                <input onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" placeholder="Enter email" required />
                            </div>
                            <button onClick={sendOtp}>Send OTP</button>
                            <div className="form-group mt-5">
                                <label htmlFor="otp">Enter OTP:</label>
                                <input onChange={(e)=>{setOtpVerify(e.target.value)}} type="text" id="otp" placeholder="Enter OTP" required />
                            </div>
                            <button onClick={verifyOtp}>Verify OTP</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;

