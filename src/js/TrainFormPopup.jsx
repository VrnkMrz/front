import React, { useState, useEffect } from 'react';
import '../css/PassengerFormPopup.css';

const TrainFormPopup = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    train_number: '',
    type: '', 
    number: '', 
    rental_price: ''
  });

  useEffect(() => {
    const selectedWagonData = localStorage.getItem('selectedWagon');
    if (selectedWagonData) {
      setFormData(JSON.parse(selectedWagonData));
    }
  }, []);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setError(""); 
  };

  const handleSubmit = () => {
    if (!formData.train_number || !formData.number || !formData.rental_price || !formData.type) {
      setError("All fields must be filled out."); 
      return; 
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h3>Edit Train Info</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" name="train_number" value={formData.train_number} onChange={handleChange} />
        <input type="text" name="type"value={formData.type} onChange={handleChange} />
        <input type="text" name="number" value={formData.number} onChange={handleChange} />
        <input type="number" name="rental_price" value={formData.rental_price} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TrainFormPopup;
