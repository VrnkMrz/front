import React, { useState } from "react";
import "../css/Carriage.css";
import { useNavigate } from "react-router-dom";
import ServicePopup from "./ServicePopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CarriageFooter({ selectedSeats, passenger, selectedSeatsCount, selectedSeatsPrice }) {
  const [showServicePopup, setShowServicePopup] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesTotalCost, setServicesTotalCost] = useState(0);
  const navigate = useNavigate();

  const addServices = (services) => {
    setSelectedServices(services);
    const total = services.reduce(
      (acc, service) => acc + service.quantity * service.price,
      0
    );
    setServicesTotalCost(total);
    setShowServicePopup(false);
  };

  return (
    <div className="reservation-footer">
      <div className="reservation-footer-text">
        <p>Selected seats count: {selectedSeatsCount}</p>
        <p>Total ticket cost: {selectedSeatsPrice.toFixed(2)}</p>
      </div>
      <div className="reservation-footer-text">
        <p>
          Selected Services:{" "}
          {selectedServices
            .map((service) => `${service.name} - ${service.quantity}`)
            .join(", ")}
        </p>
        <p>Total service cost: ${servicesTotalCost}</p>
      </div>
      <div className="reservation-footer-text">
        <button
          className="next-button"
          onClick={() => setShowServicePopup(true)}
        >
          Add Service
        </button>

      </div>
      {showServicePopup && (
        <ServicePopup
          isOpen={showServicePopup}
          onClose={() => setShowServicePopup(false)}
          onAddServices={addServices}
          passenger={passenger}
        />
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
}

export default CarriageFooter;
