import React, { useState } from 'react';
import axiosInstance from '../utils/axoisInstance';

const AddUser = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post('/api/users', { name: userName, email, password })
      .then(response => console.log('User added:', response.data))
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
