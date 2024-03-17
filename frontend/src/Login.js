// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate(); 

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             console.log('User is already logged in:', token);
//         } 
//             navigate('/login');
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const response = await axios.post("http://localhost:8080/login", { username, password });

//             const { token } = response.data;

//             localStorage.setItem('token', token);

//             console.log('User logged in successfully:', token);
//             navigate('/clubs');
//         } catch (error) {
//             console.error('Error logging in:', error);
//             setError(error.response?.data?.message || 'An error occurred during login.');
//         }
//     };

//     return (
//         <div className="main">
//             <div className="background-image"></div>
//             <div className="login-form">
//                 <h2 className="title">Login</h2>
//                 {error && <p>{error}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-container">
//                         <label htmlFor="username">Username:</label>
//                         <input
//                             className="input-field"
//                             type="text"
//                             id="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="input-container">
//                         <label htmlFor="password">Password:</label>
//                         <input
//                             className="input-field"
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button className="submit-button" type="submit">Login</button>
//                 </form>
//                 <div className="login-link">
//                     <p>Don't have an account? <a href="#">Register</a></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", { email:username, password });
            console.log(response)
            const { token } = response.data;
             console.log("login succesful")
            localStorage.setItem('token', token);
            if(response.log==1){
                navigate('/clubs')
            }else{
                navigate('/create-post')
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.response?.data?.message || 'An error occurred during login.');
        }
    };

    return (
        <div className="main">
            <div className="background-image"></div>
            <div className="login-form">
                <h2 className="title">Login</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="username">Email</label>
                        <input
                            className="input-field"
                            type="email"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password:</label>
                        <input
                            className="input-field"
                            type="password"
                           id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="submit-button" type="submit">Login</button>
                </form>
                <div className="login-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;