import React, { useState } from 'react';
import '../css/Carriage.css';
import { useNavigate } from 'react-router-dom';
import ServicePopup from './ServicePopup'; // Ensure this path is correct

function CarriageFooter({ selectedSeatsCount, selectedSeatsPrice }) {
  const [showServicePopup, setShowServicePopup] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesTotalCost, setServicesTotalCost] = useState(0);
  const navigate = useNavigate();

  const addServices = (services) => {
    setSelectedServices(services);
    const total = services.reduce((acc, service) => acc + (service.quantity * service.price), 0);
    setServicesTotalCost(total);
    setShowServicePopup(false); 
  };

  const checkOut = (event) => {
    event.preventDefault();
    if (selectedSeatsCount > 0) {
      const selectedSeatCount = JSON.parse(localStorage.getItem('selectedSeatCount'));
      const selectedPassengerCount = JSON.parse(localStorage.getItem('selectedPassengerCount'));
    
      if (selectedSeatCount !== selectedPassengerCount) {
        alert('The number of selected seats and passengers must match.');
        return;
      }
      navigate('/checkout', { state: { selectedServices, servicesTotalCost } });
    } else {
      alert('Please select at least one seat before proceeding to checkout.');
    }
  };

  const confirmSelection = () => {
  
  };
  

  return (
    <div className="reservation-footer">
      <div className='reservation-footer-text'>
        <p>Selected seats count: {selectedSeatsCount}</p>
        <p>Total cost: {selectedSeatsPrice}</p>
      </div>
      <div className='reservation-footer-text'>
        <p>Selected Services: {selectedServices.map(service => `${service.name} - ${service.quantity}`).join(', ')}</p>
        <p>Total service cost: ${servicesTotalCost}</p>
      </div>
      <div className='reservation-footer-text'>
        <button className='next-button' onClick={() => setShowServicePopup(true)}>Add Service</button>
        <button className='next-button' onClick={checkOut}>Next Page</button>
      </div>
      {showServicePopup && <ServicePopup isOpen={showServicePopup} onClose={() => setShowServicePopup(false)} onAddServices={addServices} />}
    </div>
  );
}


export default CarriageFooter;
