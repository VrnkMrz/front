import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../Navbar.jsx';
import Carriage from '../Carriage.jsx';
import Passenger from '../Passenger.jsx';
import '../../css/Carriage.css';

const SelectSeatPage = () => {

  // const [bookingInfo, setBookingInfo] = useState(() => {
  //   const savedBookingInfo = localStorage.getItem('bookingInfo');
  //   return savedBookingInfo ? JSON.parse(savedBookingInfo) : null;
  // });

  const [departure] = localStorage.getItem('departure');
  const [arrival] = localStorage.getItem('arrival');

  const [selectedSeatCount, setSelectedSeatCount] = useState(0);  

  useEffect(() => {
    departure = localStorage.getItem('departure');
    arrival = localStorage.getItem('arrival');
    console.log(departure, arrival);
  })

  return (
    <div>
      <Navbar label = {"SELECT SEAT"}/>
      <div className = 'selected_time_back_card'>
          <div className = 'selected-info-card'>
          <div id="destination-display"><h1>{departure.name} — {arrival.name}</h1></div>
          </div>
        </div>
      <div>
        <Passenger/>
        <Carriage/>
      </div>
    </div>
  );
};

export default SelectSeatPage;
