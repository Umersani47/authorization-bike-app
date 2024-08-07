import { useEffect, useState } from 'react';
import { url } from '../utils/constant';
import axiosInstance from '../utils/axoisInstance';
import { selectIsLoggedIn } from '../features/auth/authSelectors';
import { useSelector } from 'react-redux';


const BikeGrid = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { role } = useSelector((state) => state.auth);

  console.log(role)
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        let response = null;
        if (isLoggedIn) { response = await axiosInstance.get('/api/v1/bikes'); }
        else { response = await axiosInstance.get('/api/v1/bikes/guest_index'); }
        setBikes(response.data);
      } catch (error) {
        alert(error?.response?.statusText)
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handlePurchase = async (bike) => {
    try {
      await axiosInstance.post(`${url}/api/v1/bikes/${bike.id}/purchase`);
      window.location.reload()
    } catch (error) {
      alert(error)
    }

  };

  const handleBikeDelete = async (bike) => {
    try {
      await axiosInstance.delete(`${url}/api/v1/bikes/${bike.id}`);
      window.location.reload()
    } catch (error) {
      setError('Error during purchase');
      console.error('Error during purchase:', error);
    }

  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bike-grid">
      {bikes.map((bike) => (
        <div key={bike.id} className="bike-card">
          <div className='bike-cart-header'>
            <h3>{bike.title}</h3>
            {(isLoggedIn && (role == 'admin' || role == 'seller' || role == 'seller_assistant') && <button onClick={() => handleBikeDelete(bike)}>x</button>)}
          </div>
          <img src={bike.image_url} alt={bike.name} />
          <hr />
          <p>{bike.description && `Description: ${bike.description}`}</p>
          <p>{bike.model && `Model: ${bike.model}`}</p>
          <p>{bike.engine_size && `Engine Size: ${bike.engine_size}`}</p>
          <p>{bike.engine_no && `Engine No#: ${bike.engine_no}`}</p>
          <p>{bike.quantity && `Quantity: ${bike.quantity}`}</p>
          <p><strong>{bike.price && `$${bike.price}`}</strong></p>
          {!isLoggedIn && <label>Login to get more details</label>}
          {(isLoggedIn && role == 'buyer' && <button
            onClick={() => handlePurchase(bike)}
            className="purchase-btn"
            disabled={bike.quantity === 0}
          >
            {bike.quantity > 0 ? 'Purchase' : 'Out of Stock'}
          </button>)}
        </div>
      ))
      }
    </div >
  );
};

export default BikeGrid;
