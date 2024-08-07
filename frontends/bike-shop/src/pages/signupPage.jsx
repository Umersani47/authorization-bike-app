import React, { useState } from 'react';
import { url } from '../utils/constant'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axoisInstance';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post(`${url}/users`, { "user": { "email": email, "password": password } })
      .then(response => {
        console.log('Signed up:', response.data);
        navigate('/login');  // Redirect to login after signup
      })
      .catch(error => console.error('Error signing up:', error));
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
