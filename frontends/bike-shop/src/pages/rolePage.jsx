import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../utils/constant';
import axiosInstance from '../utils/axoisInstance';

const RolePage = () => {
  const { roleId } = useParams();
  const [role, setRole] = useState([]);
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

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get(`${url}/api/v1/roles/${roleId}`);
        setRole(response.data);
      } catch (err) {
        console.log('Error Role page')
      }
    };

    fetchRole();
  }, []);



  const handleChange = (event) => {
    const { name, checked } = event.target;
    setPermissions({
      ...permissions,
      [name]: checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${url}/api/v1/roles/${roleId}`, {
        role: {
          permissions: permissions,
        },
      });
      console.log('Permissions saved:', response.data);
    } catch (error) {
      console.error('Error saving permissions:', error);
    }
  };

  return (
    <div>
      <h2>Role Permissions for Role ID: {role.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Bike CRUD Permissions:
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
          User CRUD Permissions:
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
          History of Bike Purchase Permissions:
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

export default RolePage;
