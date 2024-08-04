import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './pages/landingPage';
import AdminPage from './pages/adminPanel';
import AddRole from './components/addRole';
import AddUser from './components/addUser';
import AddBike from './components/addBike';
import SignupPage from './pages/signupPage';
import LoginPage from './pages/loginPage';
import RolesPage from './pages/rolesPage';
import RolePage from './pages/rolePage';
import UsersPage from './pages/usersPage';
import EditUserRole from './components/editUserRole';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/admin" exact element={<AdminPage />} />
          <Route path="/admin/add-role" component={AddRole} />
          <Route path="/admin/add-user" component={AddUser} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/add-bike" component={AddBike} />
          <Route path={`/admin/roles`} element={<RolesPage />} />
          <Route path='/admin/roles/:roleId' element={<RolePage />} />
          <Route path='/admin/add_role' element={<AddRole />} />
          <Route path='/admin/add_bike' element={<AddBike />} />
          <Route path='/admin/users' element={<UsersPage />} />
          <Route path='/admin/add_user' element={<AddUser />} />
          <Route path='/admin/users/:userId' element={<EditUserRole />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
