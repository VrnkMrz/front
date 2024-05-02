import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Ticket from '../Ticket';
import Swal from 'sweetalert2'; // Import SweetAlert2

const TicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.fromCheckout) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Ticket usage updated successfully!',
                timer: 5000,
                toast: true,
                position: 'top-center',
                showConfirmButton: false,
                timerProgressBar: true,
            });
        }
    }, [location]);

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
                        passengers: ticket.passenger,
                        wagonType: ticket.wagon.type
                    }));
                setTickets(validTickets);
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

    const handleTicketReturnConfirm = () => {
        Swal.fire({
            icon: 'success',
            title: 'Confirmed',
            text: 'Ticket return confirmed successfully!',
            timer: 3000,
            toast: true,
            position: 'top-center',
            showConfirmButton: false,
            timerProgressBar: true,
        });
    };

    return (
        <div>
            <Navbar label="TICKET HISTORY" />
            {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                    <Ticket
                        key={index}
                        id={ticket.id}
                        usageTimestamp={ticket.usageTimestamp}
                        wagonType={ticket.wagonType}
                        departureTime={ticket.departureTime}
                        arrivalTime={ticket.arrivalTime}
                        trainNumber={ticket.trainNumber}
                        priceWithDiscount={ticket.priceWithDiscount}
                        passenger={ticket.passengers}
                        onTicketReturnConfirm={handleTicketReturnConfirm} 
                    />
                ))
            ) : (
                <div className="no-tickets">
                    <p>You have not purchased any tickets yet. Start your adventure!</p>
                    <Link to="/book" className="return-ticket-button">Book Tickets</Link>
                </div>
            )}
        </div>
    );
};

export default TicketPage;
