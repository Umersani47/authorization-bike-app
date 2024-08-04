import axios from 'axios';
import React, { useState } from 'react';
import { url } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axoisInstance';

const AddRole = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    bike_create: false,
    bike_read: false,
    bike_update: false,
    bike_delete: false,
    user_create: false,
    user_read: false,
    user_update: false,
    user_delete: false,
    history_read: false,
    can_purchase: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setPermissions({
      ...permissions,
      [name]: checked,
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(`${url}/api/v1/roles`, {
        role: {
          name: name,
          permissions: permissions,
        },
      });
      console.log('Permissions saved:', response.data);
      navigate('/admin/roles');
    } catch (error) {
      console.error('Error saving permissions:', error);
    }
  };

  return (
    <div>
      <h2>Add Role and Permissions</h2>
      <form className='role-permission-form' onSubmit={handleSubmit}>
        <label>
          <strong>Role Name:</strong>
          <select className='role-drop-down'
            id="role-select"
            value={name}
            onChange={handleNameChange}
          >
            <option value="">Select a role</option> {/* Blank option */}
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="seller_assistant">Seller Assistant</option>
            <option value="buyer">Buyer</option>
          </select>
          <p><br /></p>
          <strong>Bike CRUD Permissions:</strong>
          <input
            type="checkbox"
            name="bike_create"
            checked={permissions.bike_create}
            onChange={handleChange}
          />{' '}
          Create
          <input
            type="checkbox"
            name="bike_read"
            checked={permissions.bike_read}
            onChange={handleChange}
          />{' '}
          Read
          <input
            type="checkbox"
            name="bike_update"
            checked={permissions.bike_update}
            onChange={handleChange}
          />{' '}
          Update
          <input
            type="checkbox"
            name="bike_delete"
            checked={permissions.bike_delete}
            onChange={handleChange}
          />{' '}
          Delete
        </label>
        <br />
        <label>
          <strong>User CRUD Permissions:</strong>
          <p><br /></p>
          <input
            type="checkbox"
            name="user_create"
            checked={permissions.user_create}
            onChange={handleChange}
          />{' '}
          Create
          <input
            type="checkbox"
            name="user_read"
            checked={permissions.user_read}
            onChange={handleChange}
          />{' '}
          Read
          <input
            type="checkbox"
            name="user_update"
            checked={permissions.user_update}
            onChange={handleChange}
          />{' '}
          Update
          <input
            type="checkbox"
            name="user_delete"
            checked={permissions.user_delete}
            onChange={handleChange}
          />{' '}
          Delete
        </label>
        <br />
        <label>
          <strong>History of Bike Purchase Permissions:</strong>
          <p><br /></p>
          <input
            type="checkbox"
            name="history_read"
            checked={permissions.history_read}
            onChange={handleChange}
          />{' '}
          Read
        </label>
        <br />
        <label>
          Bike Purchase Permissions:
          <input
            type="checkbox"
            name="can_purchase"
            checked={permissions.can_purchase}
            onChange={handleChange}
          />{' '}
          Purchase
        </label>
        <button type="submit">Save Permissions</button>
      </form>
    </div>
  );
};

export default AddRole;
