import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import RolesPage from './rolesPage';
import { useSelector } from 'react-redux';

const AdminPanel = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <div>
      <div>
        {role == 'admin' && <button className='admin-nav-btn'>
          <Link to={`/admin/roles`}>Roles</Link>
        </button>}
        <button className='admin-nav-btn'>
          <Link to={`/`}>Bikes</Link>
        </button>
        {role == 'admin' && <button className='admin-nav-btn'>
          <Link to={`/admin/users`}>Users</Link>
        </button>}
      </div>
      <div>
        <Routes>
          <Route path={`admin/roles`} element={<RolesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
