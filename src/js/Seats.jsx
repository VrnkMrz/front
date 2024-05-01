import React from 'react';
import '../css/Seats.css';

function Seat({ seatNumber, isOccupied, onSelect, isSelected }) {
  const selectSeat = () => {
    if (!isOccupied){
      onSelect(seatNumber, !isSelected);
    }
  };

  return (
    <div
      className={`seat ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={selectSeat}
    >
      <p>{seatNumber}</p>
    </div>
  );
}

export default Seat;
