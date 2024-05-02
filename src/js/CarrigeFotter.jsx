import React, { useState } from "react";
import "../css/Carriage.css";
import { useNavigate } from "react-router-dom";
import ServicePopup from "./ServicePopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CarriageFooter({ selectedSeatsCount, selectedSeatsPrice }) {
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

  const checkOut = (event) => {
    event.preventDefault();
    if (selectedSeatsCount > 0) {
      const selectedSeatCount = JSON.parse(
        localStorage.getItem("selectedSeatCount")
      );
      const selectedPassengerCount = JSON.parse(
        localStorage.getItem("selectedPassengerCount")
      );
      localStorage.setItem("ticket_price", selectedSeatsPrice);

      if (selectedSeatCount !== selectedPassengerCount) {
        toast.error("The number of selected seats and passengers must match.");
        return;
      }
      navigate("/checkout", { state: { selectedServices, servicesTotalCost } });
    } else {
      toast.error(
        "Please select at least one seat before proceeding to checkout."
      );
    }
  };

  return (
    <div className="reservation-footer">
      <div className="reservation-footer-text">
        <p>Selected seats count: {selectedSeatsCount}</p>
        <p>Total ticket cost: {selectedSeatsPrice}</p>
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
        <button className="next-button" onClick={checkOut}>
          Next Page
        </button>
      </div>
      {showServicePopup && (
        <ServicePopup
          isOpen={showServicePopup}
          onClose={() => setShowServicePopup(false)}
          onAddServices={addServices}
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
