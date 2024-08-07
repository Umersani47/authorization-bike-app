import { useState } from 'react';
import { url } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axoisInstance';

const AddRole = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    can_access_bikes_create: false,
    can_access_bikes_index: false,
    can_access_bikes_update: false,
    can_access_bikes_destroy: false,
    can_access_bikes_purchase_history: false,
    can_access_bikes_purchase: false,
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
      <div className='role-header-label'><h2>Add Role and Permissions</h2></div>
      <form className='role-permission-form' onSubmit={handleSubmit}>
        <label>
          <strong>Role Name:</strong>
          <select
            className='role-drop-down'
            id="role-select"
            value={name}
            onChange={handleNameChange}
          >
            <option value="">Select a role</option> { }
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="seller_assistant">Seller Assistant</option>
            <option value="buyer">Buyer</option>
          </select>
        </label>
        <p><br /></p>

        <label>
          <strong>Bike CRUD Permissions:</strong>
        </label>
        <div className="role-inline-label">
          <input
            type="checkbox"
            name="can_access_bikes_create"
            checked={permissions.bike_create}
            onChange={handleChange}
          />{' '}
          Create
        </div>
        <div className="role-inline-label">
          <input
            type="checkbox"
            name="can_access_bikes_index"
            checked={permissions.bike_read}
            onChange={handleChange}
          />{' '}
          Read
        </div>
        <div className="role-inline-label">
          <input
            type="checkbox"
            name="can_access_bikes_update"
            checked={permissions.bike_update}
            onChange={handleChange}
          />{' '}
          Update
        </div>
        <div className="role-inline-label">
          <input
            type="checkbox"
            name="can_access_bikes_destroy"
            checked={permissions.bike_delete}
            onChange={handleChange}
          />{' '}
          Delete
        </div>

        <p><br /></p>

        <label>
          <strong>History of Bike Purchase Permissions:</strong>
        </label>
        <div className="role-inline-label">
          <input
            type="checkbox"
            name="can_access_bikes_purchase_history"
            checked={permissions.history_read}
            onChange={handleChange}
          />{' '}
          Read
        </div>

        <p><br /></p>

        <label>
          Bike Purchase Permissions:
        </label>
        <div className="role-inline-label">
          <input
            type="checkbox"
            name="can_access_bikes_purchase"
            checked={permissions.can_purchase}
            onChange={handleChange}
          />{' '}
          Purchase
        </div>

        <button type="submit">Save Permissions</button>
      </form>
    </div>
  );
};

export default AddRole;
