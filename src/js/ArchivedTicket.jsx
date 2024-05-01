import React from 'react';
import '../css/ArchivedTicket.css';

const ArchivedTicket = ({
    usageTimestamp, 
    wagonType, 
    departureTime, 
    arrivalTime, 
    trainNumber, 
    passengers
}) => {
  return (
    <div className='ticket-card'>
      <div className="ticket">
          <div className="ticket-date">{usageTimestamp}</div>
        <div className="ticket-info">
          <p className="train-number">{trainNumber}</p>
          <p className="route">{wagonType}</p>
          <p>{departureTime}</p>
          <p>{arrivalTime}</p>
        </div>
        <div className="passengers">
          {passengers.map((passenger, index) => (
            <div className="passenger" key={index}>
              <p>{passenger.firstName}</p>
              <p>{passenger.wagonNumber} вагон, {passenger.seat} місце</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivedTicket;
