import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import ArchivedTicket from '../ArchivedTicket';
import '../../css/ArchivedTicket.css'; 

const ArchivedTicketPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      try {
        const response = await axios.get('http://localhost:9001/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const usedTickets = response.data.filter(ticket => ticket.usage_timestamp !== null).map(ticket => ({
          id: ticket.id,
          usageTimestamp: new Date(ticket.usage_timestamp).toLocaleString(), 
          wagonType: ticket.wagon?.type,
          departureTime: ticket.routeParts[0]?.departure_time_minutes, 
          arrivalTime: ticket.routeParts[0]?.arrival_time_minutes,
          trainNumber: ticket.train?.number,
          priceWithDiscount: ticket.price_with_discount,
          passengers: ticket.passenger,
        }));
        setTickets(usedTickets);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load tickets!',
      });
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <Navbar label="Archived Tickets" />
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <ArchivedTicket
            key={index}
            usageTimestamp={ticket.usageTimestamp}
            wagonType={ticket.wagonType}
            departureTime={ticket.departureTime}
            arrivalTime={ticket.arrivalTime}
            trainNumber={ticket.trainNumber}
            priceWithDiscount={ticket.priceWithDiscount}
            passenger={ticket.passengers}
          />
        ))
      ) : (
        <div className="no-tickets">
          <p>You have not used any tickets yet. Start your adventures!</p>
          <Link to="/book" className="return-ticket-button">Book Tickets</Link>
        </div>
      )}
    </div>
  );
};

export default ArchivedTicketPage;
