import React from 'react';
import { Link } from 'react-router-dom';

const RolesTab = () => {
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    // Add more roles as needed
  ];

  return (
    <div>
      <h2>Roles</h2>
      <Link to="/admin/add-role">
        <button>Add Role</button>
      </Link>
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
              <td>
                <Link to={`/admin/roles/${role.id}`}>{role.name}</Link>
              </td>
              <td>
                <Link to={`/admin/roles/${role.id}`}>Edit Permissions</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTab;
