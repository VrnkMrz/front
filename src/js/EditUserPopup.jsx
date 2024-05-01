// EditUserPopup.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/PassengerFormPopup.css';

const EditUserPopup = ({ user, onClose, onUpdateUserInfo }) => {
  const [formData, setFormData] = useState(user);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setError(""); 
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await axios.put('http://localhost:9001/users', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("User updated:", response.data);
      onUpdateUserInfo(response.data); // Оновити дані користувача в батьківському компоненті
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again later.");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h3>Edit User Info</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditUserPopup;
