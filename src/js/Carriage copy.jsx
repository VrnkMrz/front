import React, { useState, useEffect } from 'react';
import Seat from './Seats';
import CarrigeFotter from './CarrigeFotter';
import '../css/Carriage.css';

const Carriage = () => {
  const mockcompartments = [
    {
      compartmentNumber: 1,
      seats: [
        { "number": 1, "isOccupied": false, "price": 100 },
        { "number": 2, "isOccupied": false, "price": 150 },
        { "number": 3, "isOccupied": true, "price": 200 },
        { "number": 4, "isOccupied": false, "price": 180 }
      ]
    },
    {
      compartmentNumber: 2,
      seats: [
        { "number": 5, "isOccupied": false, "price": 220 },
        { "number": 6, "isOccupied": false, "price": 130 },
        { "number": 7, "isOccupied": true, "price": 90 },
        { "number": 8, "isOccupied": false, "price": 210 }
      ]
    },
    {
      compartmentNumber: 3,
      seats: [
        { "number": 9, "isOccupied": false, "price": 240 },
        { "number": 10, "isOccupied": false, "price": 70 },
        { "number": 11, "isOccupied": true, "price": 180 },
        { "number": 12, "isOccupied": false, "price": 200 }
      ]
    },
    {
      compartmentNumber: 4,
      seats: [
        { "number": 13, "isOccupied": false, "price": 120 },
        { "number": 14, "isOccupied": false, "price": 250 },
        { "number": 15, "isOccupied": true, "price": 150 },
        { "number": 16, "isOccupied": true, "price": 100 }
      ]
    },
    {
      compartmentNumber: 5,
      seats: [
        { "number": 17, "isOccupied": false, "price": 220 },
        { "number": 18, "isOccupied": false, "price": 130 },
        { "number": 19, "isOccupied": true, "price": 90 },
        { "number": 20, "isOccupied": false, "price": 210 }
      ]
    },
  ];
  
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  useEffect(() => {
    localStorage.setItem('selectedSeatCount', JSON.stringify(selectedSeats.size));
  }, [selectedSeats]);
  
  const calculateTotalPrice = (selectedSeats, compartments) => {
    let totalPrice = 0;
    selectedSeats.forEach(seatNumber => {
      compartments.forEach(compartment => {
        compartment.seats.forEach(seat => {
          if (seat.number === seatNumber && !seat.isOccupied) {
            totalPrice += seat.price;
          }
        });
      });
    });
    return totalPrice;
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

  return (
    <div className='carriage-card'>
      <div className="carriage">
        {mockcompartments.map(compartment => (
          <div key={compartment.compartmentNumber} className="compartment">
            {compartment.seats.map(seat => (
              <Seat
                seatNumber={seat.number}
                isOccupied={seat.isOccupied}
                onSelect={handleSelectSeat}
                isSelected={selectedSeats.has(seat.number)}
              />
            ))}
          </div>
        ))}
      </div>
      <CarrigeFotter selectedSeatsCount={selectedSeats.size} selectedSeatsPrice={calculateTotalPrice(selectedSeats, mockcompartments)} />
    </div>
  );
};

export default Carriage;