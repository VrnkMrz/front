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

  useEffect(() => {
    const fetchedDeparture = localStorage.getItem('departure');
    const fetchedArrival = localStorage.getItem('arrival');
    if (fetchedDeparture && fetchedArrival) {
      setDeparture(JSON.parse(fetchedDeparture));
      setArrival(JSON.parse(fetchedArrival));
    }

    // const selectedWagon = JSON.parse(localStorage.getItem('selectedWagon'));
    // if (selectedWagon) {
    //   fetchTicketPrices(selectedWagon);
    // }
  }, []);


  return (
    <div>
      <Navbar label="SELECT SEAT"/>
      <div className='selected_time_back_card'>
        <div className='selected-info-card'>
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
