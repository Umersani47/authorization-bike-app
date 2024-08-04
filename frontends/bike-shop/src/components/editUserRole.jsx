import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axoisInstance';
import { url } from '../utils/constant';

const EditUserRole = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndRoles = async () => {
      try {
        // Fetch user details
        const userResponse = await axiosInstance.get(`${url}/api/v1/users/${userId}`);
        setUser(userResponse.data);

        // Fetch roles
        const rolesResponse = await axiosInstance.get(`${url}/api/v1/roles`);
        setRoles(rolesResponse.data);

        // Set selected role
        setSelectedRole(userResponse.data.role);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserAndRoles();
  }, [userId]);

  const handleRoleChange = async (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);

    try {
      await axiosInstance.put(`/api/v1/users/${userId}`, { role_id: newRole });
      alert('Role updated successfully');
    } catch (err) {
      setError(err);
      alert('Error updating role');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className='edit-user-div'>
      <h2>Edit User Role</h2>
      <p className='user-email-label'><strong>Email:</strong> {user.email}</p>
      <label>
        <strong>Role:</strong>
        <select className='role-select-dropdown' value={selectedRole} onChange={handleRoleChange}>
          <option value="">Select a role</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default EditUserRole;
