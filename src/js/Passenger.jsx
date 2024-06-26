import React, { useState, useEffect } from "react";
import axios from "axios";
import Carriage from "./Carriage";
import ConfirmDialog from "./ConfirmDialog";
import PassengerFormPopup from "./PassengerFormPopup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Passenger.css";
import "../css/Carriage.css";

const Passengers = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [passengerToDelete, setPassengerToDelete] = useState(null);
  const [selectedPassengerIds, setSelectedPassengerIds] = useState([]);

  const token = localStorage.getItem("token");

  const checkOut = (event) => {
    
      navigate("/checkout");
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const togglePassengerSelection = (id) => {
    setSelectedPassengerIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem(
      "selectedPassengerCount",
      JSON.stringify(selectedPassengerIds.length)
    );
    localStorage.setItem(
      "selectedPassengerId",
      JSON.stringify(selectedPassengerIds)
    );
    fetchData();
  }, [selectedPassengerIds]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9001/passenger", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const passengersWithTicketNumbers = response.data.map(passenger => ({
        ...passenger,
        ticket_number: localStorage.getItem("selectedSeats"),
        seat_cost: null,
        seat_id: null,
      }));   
      setPassengers(passengersWithTicketNumbers);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };

  const handleNewPassengerSubmit = () => {
    toast.success("Passenger added successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    fetchData();
  };

  const handleRemovePassenger = async () => {
    try {
      await axios.delete(
        `http://localhost:9001/passenger/${passengerToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Passenger deleted successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchData();
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Failed to delete passenger:", error);
      toast.error("Failed to delete passenger.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="section_pass">
      <div className="passenger-list">
        {passengers.map((passenger) => (
          <>
            <div>
            </div>
            <div className="carriage_wrapper">
              <div
                key={passenger.id}
                className={`passenger_pass ${
                  selectedPassengerIds.includes(passenger.id) ? "selected" : ""
                }`}
                onClick={() => togglePassengerSelection(passenger.id)}
              >
                {passenger.firstName} {passenger.lastName} : {passenger.fare.title}
                              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmDialog(true);
                  setPassengerToDelete(passenger.id);
                }}
              >
                X
              </button>
              </div>
              <Carriage passengers={passengers} passenger={passenger} onSelectSeat={() => {fetchData();}}/>
            </div>
          </>
        ))}
      </div>
      <div className="pass_buttons">
      <button className="add-passenger-btn" onClick={() => setShowPopup(true)}>
        Add New Passenger
      </button>
      <button className="add-passenger-btn" onClick={checkOut}>
          Next Page
        </button>
        </div>
      {showPopup && (
        <PassengerFormPopup
          onClose={() => {
            setShowPopup(false);
            fetchData();
          }}
          onSubmit={handleNewPassengerSubmit} 
        />
      )}
      <ToastContainer />
      {showConfirmDialog && (
        <ConfirmDialog
          title="Delete Passenger"
          message="Are you sure you want to delete this passenger?"
          onCancel={() => setShowConfirmDialog(false)}
          onConfirm={handleRemovePassenger}
        />
      )}
    </div>
  );
};

export default Passengers;
