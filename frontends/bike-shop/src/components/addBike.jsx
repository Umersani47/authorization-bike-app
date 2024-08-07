import React, { useState } from 'react';
import { url } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axoisInstance';

const AddBike = () => {
  const [bikeName, setBikeName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [engine_no, setEngineNo] = useState('');
  const [model, setModel] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post(`${url}/api/v1/bikes`, { title: bikeName, description, image_url: imageUrl, price: price, engine_no: engine_no, model: model })
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error('Error adding bike:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Bike Name:
        <input
          type="text"
          value={bikeName}
          onChange={(e) => setBikeName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Engine No#:
        <input
          type="text"
          value={engine_no}
          onChange={(e) => setEngineNo(e.target.value)}
        />
      </label>
      <label>
        Model:
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </label>
      <button type="submit">Add Bike</button>
    </form>
  );
};

export default AddBike;
