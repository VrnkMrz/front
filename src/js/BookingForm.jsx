import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import "../css/BookingForm.css";

const BookingForm = ({ arrival, setArrival, departure, setDeparture }) => {
  const navigate = useNavigate();

  const bookTickets = (event) => {
    event.preventDefault();
    if (!departure || !arrival) {
      swal(
        "Incomplete form",
        "Please fill in all fields before proceeding.",
        "warning"
      );
      return;
    }
    navigate("/select-time");
  };

  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9001/stations")
      .then((response) => {
        setStations(response.data);
      })
      .catch((error) => {
        swal("Error", "Failed to load stations.", "error");
      });
  }, []);

  useEffect(() => {
    const defaultArrival = {
      "id": 135,
      "name": "Arcades",
      "lon": 4.39854,
      "lat": 50.80992
    };
    const defaultDeparture = {
      "id": 130,
      "name": "Beersel",
      "lon": 4.302603,
      "lat": 50.76661
    };

    setArrival(defaultArrival);
    setDeparture(defaultDeparture);
    localStorage.setItem("arrival", JSON.stringify(defaultArrival));
    localStorage.setItem("departure", JSON.stringify(defaultDeparture));
  }, [setArrival, setDeparture]);

  return (
    <div className="booking-form">
      <form onSubmit={bookTickets}>
        <div className="form-group">
          <p className="form-label">Departure</p>
          <select
            className="form-control"
            value={departure ? departure.name : ""}
            onChange={(e) => {
              const selectedStation = stations.find(
                (station) => station.name === e.target.value
              );
              setDeparture(selectedStation);
              localStorage.setItem("departure", JSON.stringify(selectedStation));
            }}
            required
          >
            <option value="">Select a city</option>
            {stations.map((station) => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <p className="form-label">Arrival</p>
          <select
            className="form-control"
            value={arrival ? arrival.name : ""}
            onChange={(e) => {
              const selectedStation = stations.find(
                (station) => station.name === e.target.value
              );
              setArrival(selectedStation);
              localStorage.setItem("arrival", JSON.stringify(selectedStation));
            }}
            required
          >
            <option value="">Select a city</option>
            {stations.map((station) => (
              <option key={station.id} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-btn">
          <button className="submit-btn">Check availability</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;