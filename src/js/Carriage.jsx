import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Seat from './Seats';
import CarrigeFooter from './CarrigeFotter';
import '../css/Carriage.css';

const Carriage = () => {
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [compartments, setCompartments] = useState([]);
  const [baseTicketPrice, setBaseTicketPrice] = useState(0); 

  useEffect(() => {
    localStorage.setItem('selectedSeatCount', JSON.stringify(selectedSeats.size));
    const selectedWagon = JSON.parse(localStorage.getItem('selectedWagon'));
    if (selectedWagon) {
      fetchSeatData(selectedWagon);
      fetchTicketPrices(selectedWagon);
    }
  }, [selectedSeats]);

  const fetchSeatData = (wagon) => {
    axios.get(`http://localhost:9001/tickets/available-seats/${wagon.wagonId}`)
      .then(response => {
        const groupedSeats = groupSeatsIntoCompartments(response.data);
        setCompartments(groupedSeats);
      })
      .catch(error => console.error('Error fetching available seats:', error));
  };

  const fetchTicketPrices = (wagon) => {
    axios.get(`http://localhost:9001/routes/full`, {
      params: {
        wagon_id: wagon.wagonId,
        departure_order: wagon.departure.order,
        arrival_order: wagon.arrival.order
      }
    })
    .then(response => {
      const totalPrice = response.data.reduce((acc, part) => acc + part.price, 0);
      setBaseTicketPrice(totalPrice); 
    })
    .catch(error => console.error('Error fetching ticket prices:', error));
  };

  const handleSelectSeat = (number, isSelected) => {
    setSelectedSeats(prevSelectedSeats => {
      const newSelectedSeats = new Set(prevSelectedSeats);
      if (isSelected) {
        newSelectedSeats.add(number);
      } else {
        newSelectedSeats.delete(number);
      }
      return newSelectedSeats;
    });
  };

  function groupSeatsIntoCompartments(seats, compartmentSize = 4) {
    const compartments = [];
    for (let i = 0; i < seats.length; i += compartmentSize) {
      compartments.push(seats.slice(i, i + compartmentSize));
    }
    return compartments;
  }  

  const calculateTotalPrice = () => {
    return baseTicketPrice * selectedSeats.size;
  };

  return (
    <div className='carriage-card'>
      <div className="carriage">
        {compartments.map((compartment, index) => (
          <div key={index} className="compartment">
            {compartment.map(seat => (
              <Seat
                key={seat.number}
                seatNumber={seat.number}
                isOccupied={!seat.isFree}
                onSelect={() => handleSelectSeat(seat.number, !selectedSeats.has(seat.number))}
                isSelected={selectedSeats.has(seat.number)}
              />
            ))}
          </div>
        ))}
      </div>
      <CarrigeFooter selectedSeatsCount={selectedSeats.size} selectedSeatsPrice={calculateTotalPrice()} />
    </div>
  );
};

export default Carriage;
