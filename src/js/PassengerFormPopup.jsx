import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/PassengerFormPopup.css';

const PassengerFormPopup = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    user: '', 
    fare: '', 
    birthDate: '', 
    firstName: '', 
    lastName: ''
  });
  const token = localStorage.getItem('token'); 
  const [fares, setFares] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFares = async () => {
      try {
        const response = await axios.get('http://localhost:9001/fares');
        setFares(response.data);
      } catch (error) {
        console.error('Error fetching fares:', error);
        setError('Failed to fetch fares. Please try again later.');
      }
    };

    fetchFares();

    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:9001/auth/whoami', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFormData(prevData => ({
          ...prevData,
          user: response.data.user_id
        }));
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    if (token) {
      fetchUserId();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setError(""); 
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.fare) {
      setError("All fields must be filled out."); 
      return; 
    }
    try {
      const formattedDate = new Date(formData.birthDate).toLocaleDateString('uk-UA');
      const postData = {
        ...formData,
        birthDate: formattedDate
      };
      console.log("Passenger added: ", postData);
      await axios.post('http://localhost:9001/passenger', postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onSubmit(); 
      onClose();
    } catch (error) {
      console.error('Error adding passenger:', error);
      setError('Failed to add passenger. Please try again later.');
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h3>Add New Passenger</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input type="date" name="birthDate" onChange={handleChange} />
        <select name="fare" onChange={handleChange}>
          <option value="Default"></option>
          {fares.map(fare => (
            <option key={fare.id} value={fare.id}>{fare.title}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PassengerFormPopup;
