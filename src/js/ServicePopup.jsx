import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ServicePopup.css';

const ServicePopup = ({ isOpen, onClose, onAddServices, wagonId }) => {
    const [services, setServices] = useState([]);
    const [serviceQuantities, setServiceQuantities] = useState({});

    useEffect(() => {
        if (isOpen) {
            const storedWagon = localStorage.getItem('selectedWagon');
            if (storedWagon) {
                const wagon = JSON.parse(storedWagon);
                const wagonId = wagon.wagonId;

                axios.get(`http://localhost:9001/additional-services/wagon/${wagonId}`)
                    .then(response => {
                        setServices(response.data);
                        const initialQuantities = {};
                        response.data.forEach(service => {
                            initialQuantities[service.id] = 0;
                        });
                        setServiceQuantities(initialQuantities);
                    })
                    .catch(error => console.error('Error fetching services:', error));
            }
        }
    }, [isOpen]); 

    const handleQuantityChange = (id, isChecked) => {
        const newQuantity = isChecked ? 1 : 0; 
        setServiceQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: newQuantity
        }));
    };

    const handleAddServices = () => {
        const selectedServices = services
            .filter(service => serviceQuantities[service.id] > 0)
            .map(service => ({
                id: service.id,
                name: service.name,
                price: service.price,
                quantity: serviceQuantities[service.id]
            }));
        onAddServices(selectedServices);
        localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    };

    if (!isOpen) return null;

    return (
        <div className="service-popup-overlay">
            <div className="service-popup">
                <h1>Select a Service</h1>
                <ul>
                    {services.map((service) => (
                        <li key={service.id}>
                            {service.name} - ${service.price}
                            <input
                                type="checkbox"
                                onChange={(e) => handleQuantityChange(service.id, e.target.checked)}
                                checked={serviceQuantities[service.id] > 0}
                            />
                        </li>
                    ))}
                </ul>
                <button onClick={handleAddServices}>Add</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ServicePopup;
