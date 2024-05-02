import React, { useState, useEffect } from "react";
import axios from "axios";
import Carriage from "./Carriage";
import ConfirmDialog from "./ConfirmDialog";
import PassengerFormPopup from "./PassengerFormPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Passenger.css";
import "../css/Carriage.css";

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [passengerToDelete, setPassengerToDelete] = useState(null);
  const [selectedPassengerIds, setSelectedPassengerIds] = useState([]);

  const token = localStorage.getItem("token");

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
  }, [selectedPassengerIds]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:9001/passenger", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPassengers(response.data);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };

  const handleNewPassengerSubmit = async () => {
    await fetchData();
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
                {passenger.firstName} {passenger.lastName}
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
              <Carriage />
            </div>
          </>
        ))}
      </div>
      <button className="add-passenger-btn" onClick={() => setShowPopup(true)}>
        Add New Passenger
      </button>
      {showPopup && (
        <PassengerFormPopup
          onClose={() => {
            setShowPopup(false);
            fetchData();
          }}
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
