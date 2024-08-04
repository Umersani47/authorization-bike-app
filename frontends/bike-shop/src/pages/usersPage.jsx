import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { url } from '../utils/constant'
import axiosInstance from '../utils/axoisInstance';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get(`${url}/api/v1/users`);
        setUsers(response.data);
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
        <h2>Users</h2>
        <div className="add-role-button">
        </div>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Role</th>
              <th>Assign Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role ? user.role.name : 'No Role'}</td>
                <td>
                  <Link to={`/admin/users/${user.id}`}>Edit Role</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UsersPage;
