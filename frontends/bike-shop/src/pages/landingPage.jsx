import BikeGrid from '../components/bikeGrid';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn } from '../features/auth/authSelectors';
import { useSelector } from 'react-redux';


const LandingPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { role } = useSelector((state) => state.auth);

  return (
    <div className='landing-page'>

      {isLoggedIn && (role == 'admin' || role == 'seller_assistant' || role == 'seller') && <Link to="/admin/add_bike" >
        <button className='add-bike-btn'>Add Bike</button>
      </Link>}
      <h1>Welcome to Bike Shop</h1>
      {(!isLoggedIn && <h3>Please Login</h3>)}
      <BikeGrid />
    </div>
  );
};

export default LandingPage;
