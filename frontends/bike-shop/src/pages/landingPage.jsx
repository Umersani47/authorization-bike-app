import React, { useEffect, useState } from 'react';
import BikeGrid from '../components/bikeGrid';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn } from '../features/auth/authSelectors';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axoisInstance';


const LandingPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { role, loading, error } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const fetchUserAdmin = async () => {
  //     try {
  //     } catch (error) {
  //       console.error('Error fetching bikes:', error);
  //     } finally {
  //       console.error('Success');
  //     }
  //   };

  //   fetchUserAdmin();
  // }, []);

  return (
    <div className='landing-page'>

      {isLoggedIn && role == 'admin' && <Link to="/admin/add_bike" >
        <button className='add-bike-btn'>Add Bike</button>
      </Link>}
      <h1>Welcome to Bike Shop</h1>
      {(!isLoggedIn && <h3>Please Login</h3>)}
      <BikeGrid />
    </div>
  );
};

export default LandingPage;
