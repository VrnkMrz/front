import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For creating a link to the booking page
import Navbar from '../Navbar';
import ArchivedTicket from '../ArchivedTicket';
import '../../css/ArchivedTicket.css'; // Ensure your CSS path is correct

const ArchivedTicketPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
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
          usageTimestamp: new Date(ticket.usage_timestamp).toLocaleString(), // Formatting the timestamp
          wagonType: ticket.wagon?.type,
          departureTime: ticket.routeParts[0]?.departure_time_minutes, // Assuming there's at least one route part
          arrivalTime: ticket.routeParts[0]?.arrival_time_minutes,
          trainNumber: ticket.train?.number,
          priceWithDiscount: ticket.price_with_discount,
          passengers: `${ticket.passenger.firstName} ${ticket.passenger.lastName}`
        }));
        setTickets(usedTickets);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
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
            passengers={ticket.passengers}
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
