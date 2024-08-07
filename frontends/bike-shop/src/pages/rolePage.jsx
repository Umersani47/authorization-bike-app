import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../utils/constant';
import axiosInstance from '../utils/axoisInstance';

const RolePage = () => {
  const { roleId } = useParams();
  const [role, setRole] = useState([]);
  const [permissions, setPermissions] = useState({
    can_access_bikes_create: false,
    can_access_bikes_index: false,
    can_access_bikes_update: false,
    can_access_bikes_destroy: false,
    can_access_bikes_purchase_history: false,
    can_access_bikes_purchase: false,
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
      const response = await axiosInstance.put(`${url}/api/v1/roles/${roleId}`, {
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
      <div className='role-header-label'><h2>Role Permissions for Role ID: {role.name}</h2></div>
      <form onSubmit={handleSubmit}>
        <label>
          Bike CRUD Permissions:
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
        </label>
        <br />
        <label>
          History of Bike Purchase Permissions:
          <div className="role-inline-label">
            <input
              type="checkbox"
              name="can_access_bikes_purchase_history"
              checked={permissions.history_read}
              onChange={handleChange}
            />{' '}
            Read
          </div>
        </label>
        <br />
        <label>
          Bike Purchase Permissions:
          <div className="role-inline-label">
            <input
              type="checkbox"
              name="can_access_bikes_purchase"
              checked={permissions.can_purchase}
              onChange={handleChange}
            />{' '}
            Purchase
          </div>
        </label>
        <button type="submit">Save Permissions</button>
      </form>
    </div >
  );
};

export default RolePage;
