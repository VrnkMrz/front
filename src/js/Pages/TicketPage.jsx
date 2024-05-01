import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Ticket from '../Ticket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TicketPage = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token'); 
            try {
                const response = await axios.get('http://localhost:9001/tickets', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const validTickets = response.data
                    .filter(ticket => ticket.usage_timestamp === null)  
                    .map(ticket => ({
                        id: ticket.id,
                        usageTimestamp: ticket.usage_timestamp,
                        departureTime: ticket.routeParts[0]?.departure_time_minutes,
                        arrivalTime: ticket.routeParts[0]?.arrival_time_minutes,
                        trainNumber: ticket.train.number,
                        priceWithDiscount: ticket.price_with_discount,
                        passengers: `${ticket.passenger.firstName} ${ticket.passenger.lastName}`,
                        wagonType: ticket.wagon.type
                    }));
                
                if (validTickets.length > 0) {
                    setTickets(validTickets);
                } else {
                    setTickets([]);
                    toast.info("All your tickets have been used or no tickets found.");
                }
            } catch (error) {
                console.error("Failed to fetch tickets:", error);
                toast.error("Failed to load tickets!");
            }
        };

        fetchTickets();
    }, []);

    const handleTicketReturnConfirm = () => {
        toast.success("Ticket return confirmed successfully!");
    };

    return (
        <div>
            <Navbar label="TICKET HISTORY" />
            {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                    <Ticket
                        key={index}
                        usageTimestamp={ticket.usageTimestamp}
                        wagonType={ticket.wagonType}
                        departureTime={ticket.departureTime}
                        arrivalTime={ticket.arrivalTime}
                        trainNumber={ticket.trainNumber}
                        priceWithDiscount={ticket.priceWithDiscount}
                        passengers={ticket.passengers}
                        onTicketReturnConfirm={handleTicketReturnConfirm} 
                    />
                ))
            ) : (
                <div className="no-tickets">
                    <p>You have not purchased any tickets yet. Start your adventure!</p>
                    <Link to="/book" className="return-ticket-button">Book Tickets</Link>
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                progress={undefined}
            />
        </div>
    );
};

export default TicketPage;
