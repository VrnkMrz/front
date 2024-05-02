import React from "react";
import Swal from "sweetalert2";
import "../css/ArchivedTicket.css";

const ArchivedTicket = ({
  usageTimestamp,
  wagonType,
  departureTime,
  arrivalTime,
  trainNumber,
  passenger,
}) => {
  const minutesToTime = (minutes) => {
    const adjustedMinutes = minutes % 1440;
    const hours = Math.floor(adjustedMinutes / 60);
    const mins = adjustedMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="ticket-card">
      <div className="ticket">
        <div className="ticket-date">Usage Timestamp: {usageTimestamp}</div>
        <div className="ticket-info">
          <p className="train-number">Train Number: {trainNumber}</p>
          <p className="route">Wagon Type: {wagonType}</p>
          <p>Departure Time: {minutesToTime(departureTime)}</p>
          <p>Arrival Time: {minutesToTime(arrivalTime)}</p>
        </div>
        <div className="passenger">
          <p>First Name: {passenger.firstName}</p>
          <p>Last Name: {passenger.lastName}</p>
          <p>Birth Date: {passenger.birthDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ArchivedTicket;
