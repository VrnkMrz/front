import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';    
import '../css/Ticket.css';

const Ticket = ({
    usageTimestamp, 
    wagonType, 
    departureTime, 
    arrivalTime, 
    trainNumber, 
    passengers,
    onTicketReturnConfirm 
}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleReturnClick = () => {
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        onTicketReturnConfirm(); 
        setShowConfirm(false); 
    };

    const handleCancel = () => {
        setShowConfirm(false); 
    };

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
            <button type="submit" className="return-ticket-button" onClick={handleReturnClick}>
                Use ticket
            </button>

            {showConfirm && <ConfirmDialog onConfirm={handleConfirm} onCancel={handleCancel} />}
        </div>
    );
};

export default Ticket;
