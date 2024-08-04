import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '../store';
import { selectIsLoggedIn, selectAuthState } from '../features/auth/authSelectors';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { user } = useSelector(selectAuthState);
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  console.log(role)

  return (
    <nav>
      <Link to="/">Home</Link>
      {(role == 'admin' || role == 'Seller') && <Link to="/admin">Admin Panel</Link>}
      {isLoggedIn ? (
        <button className='signout-btn' onClick={handleLogout}>Logout</button>
      )
        : (
          <><Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )
      }
    </nav >
  );
};

export default Navbar;
