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
            const response = await axios.post("http://localhost:8080/login", { email: username, password });
            console.log("Response data:", response.data); 
            const { email, log } = response.data;
            console.log("Login successful", response.data);
            localStorage.setItem('email', email);
            localStorage.setItem('log', log || 1); 
            console.log(log);
            switch (log) {
                case 2:
                    navigate('/clubs');
                    break;
                case 3:
                    navigate('/create-post');
                    break;
                default:
                    navigate('/userProfile');
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