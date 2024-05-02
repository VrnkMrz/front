import React, { useEffect } from "react";
import Swal from 'sweetalert2'; 
import axios from "axios";
import "../css/Ticket.css";

const Ticket = ({
  id,
  usageTimestamp,
  wagonType,
  departureTime,
  arrivalTime,
  trainNumber,
  passenger,
  onTicketReturnConfirm,
}) => {

    const handleUseClick = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        try {
          const response = await axios.patch(`http://localhost:9001/tickets/use/${id}`, {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log("Ticket usage updated successfully:", response.data);
          Swal.fire({
            title: 'Success!',
            text: 'Ticket used successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        } catch (error) {
          console.error("Failed to update ticket usage:", error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to use the ticket.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      };

    const handleConfirm = () => {
        onTicketReturnConfirm();
    };

    const handleCancel = () => {
    };

    const minutesToTime = (minutes) => {
        const adjustedMinutes = minutes % 1440;
        const hours = Math.floor(adjustedMinutes / 60);
        const mins = adjustedMinutes % 60;
        return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
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
            <button
                type="submit"
                className="return-ticket-button"
                onClick={handleUseClick}
            >
                Use ticket
            </button>
        </div>
    );
};

export default Ticket;
