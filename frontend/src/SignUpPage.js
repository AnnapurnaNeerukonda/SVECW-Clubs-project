import React, { useState } from 'react';
import './SignUpPage.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [dept, setDept] = useState('');
  const [redirectToLogin,setRedirectToLogin]=useState(false)

  const handleSubmit = async () => {
    if (password === confirmPassword) {
        try {
            const response = await axios.post("http://localhost:8080/register-user", {
                username,
                email,
                password,
                role,
                dept
            });
            console.log(response.data);
            if (response.data.register === "success") {
                setRedirectToLogin(true);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle error appropriately, e.g., display an error message
        }
    }
};

  if (redirectToLogin) {
    return <Navigate to="/login" />;
}

  return (
    <div className='main'>
      <div className='sign-up-form'>
      <h2 className="title">Sign Up</h2>

      <div className="input-container">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-container">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="input-container">
        <label htmlFor="confirmPassword">Role </label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="confirmPassword">Department Name</label>
        <input
          type="text"
          id="dept"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="input-field"
        />
      </div>

      <button onClick={handleSubmit} className="submit-button">
        CREATE ACCOUNT
      </button>

      <p className="login-link">
        Have already an account? <a href="/login">Login here</a>
      </p>
      </div>
    </div>
  );
};

export default SignUpPage;