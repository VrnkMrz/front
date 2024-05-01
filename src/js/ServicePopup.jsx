import React, { useState } from 'react';
import '../css/ServicePopup.css';

const ServicePopup = ({ isOpen, onClose, onAddServices }) => {
    const [serviceQuantities, setServiceQuantities] = useState({});

    const services = [
        { id: 1, name: "Wi-Fi", price: 5 },
        { id: 2, name: "Meal", price: 10 },
        { id: 3, name: "Extra Luggage", price: 15 },
        { id: 4, name: "Window Seat", price: 8 },
        { id: 5, name: "Pet Friendly", price: 12 }
    ];

    const handleQuantityChange = (id, isChecked) => {
        const newQuantity = isChecked ? 1 : 0; // Set quantity to 1 if checked, otherwise to 0
        setServiceQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: newQuantity
        }));
    };

    const handleAddServices = () => {
        const selectedServices = services
            .filter(service => serviceQuantities[service.id] > 0)
            .map(service => ({
                ...service,
                quantity: serviceQuantities[service.id]
            }));
        onAddServices(selectedServices);
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
