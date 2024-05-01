import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar.jsx';
import Carriage from '../Carriage.jsx';
import Passenger from '../Passenger.jsx';
import '../../css/Carriage.css';

const SelectSeatPage = () => {
  const [departure, setDeparture] = useState({});
  const [arrival, setArrival] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div>
      <Navbar label="SELECT SEAT"/>
      <div className='selected_time_back_card'>
        <div className='selected-info-card'>
          <div id="destination-display"><h1>{departure.name} — {arrival.name}</h1></div>
          <div id="total-price-display"><h2>Total Ticket Price: ${totalPrice.toFixed(2)}</h2></div>
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
