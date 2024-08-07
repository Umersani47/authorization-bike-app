import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { url } from '../utils/constant'

import axiosInstance from '../utils/axoisInstance';

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get(`${url}/api/v1/roles`);
        setRoles(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading roles: {error.message}</p>;

  return (
    <div className="roles-container">
      <div className="roles-content">
        <h2>Roles</h2>
        <div className="add-role-button">
          <Link to="/admin/add_role">
            <button>Add Role</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>
                  <Link to={`/admin/roles/${role.id}`}>Edit Permissions</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RolesPage;
