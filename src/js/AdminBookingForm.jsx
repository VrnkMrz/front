import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import '../css/BookingForm.css';

const AdminBookingForm = ({ arrival, setArrival, departure, setDeparture }) => {
  const [checkIn, setCheckIn] = useState('2024-03-15');
  const [checkOut, setCheckOut] = useState('2024-03-16');
  const [adults, setAdults] = useState(1);

  const navigate = useNavigate();

  const bookWagon = (event) => {
    event.preventDefault();
    if (!departure || !arrival) {
      swal("Incomplete form", "Please fill in all fields before proceeding.", "warning");
      return; 
    }
    const lessorBookingInfo = {
      departure,
      arrival,
    };
  
    localStorage.setItem('bookingInfo', JSON.stringify(lessorBookingInfo));
    navigate('/');
  };

  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/stations/all')
      .then(response => {
        setStations(response.data);
      })
      .catch(error => {
        swal("Error", "Failed to load stations.", "error");
      });
  }, []);

  return (
    <div className="booking-form">
      <form onSubmit={bookWagon}>
        <div className="form-group">
          <p className="form-label">Departure</p>
          <select 
            className="form-control" 
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          >
            <option value="">Select a city</option>
            {stations.map(station => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <p className="form-label">Arrival</p>
          <select 
            className="form-control" 
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            required
          >
            <option value="">Select a city</option>
            {stations.map(station => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-btn">
          <button className="submit-btn">Check availability</button>
        </div>
      </form>
    </div>
  );
};

export default AdminBookingForm;