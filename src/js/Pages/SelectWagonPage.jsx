import React, { useState, useEffect } from "react";
import axios from "axios";
import TrainCard from "../TrainCard";
import MapRoute from "../MapRoute";
import Navbar from "../Navbar";
import "../../css/TrainCard.css";

const SelectWagonPage = () => {
  const [departure, setDeparture] = useState({});
  const [arrival, setArrival] = useState({});
  const [wagons, setWagons] = useState([]);
  const [routeParts, setRouteParts] = useState({});
  const [departureTimeFilter, setDepartureTimeFilter] = useState("");
  const [arrivalTimeFilter, setArrivalTimeFilter] = useState("");

  useEffect(() => {
    const storedDeparture = JSON.parse(localStorage.getItem("departure"));
    const storedArrival = JSON.parse(localStorage.getItem("arrival"));
    if (storedDeparture) {
      setDeparture(storedDeparture);
    }
    if (storedArrival) {
      setArrival(storedArrival);
    }
  }, []);

  useEffect(() => {
    if (departure.id && arrival.id) {
      axios.get("http://localhost:9001/routes", {
        params: {
          arrival_station: arrival.id,
          departure_station: departure.id,
        },
      })
      .then((response) => {
        const filteredWagons = response.data.filter(wagon => {
          const departureMinutes = parseInt(wagon.departure.departureTimeMinutes, 10);
          const arrivalMinutes = parseInt(wagon.arrival.arrivalTimeMinutes, 10);
          return (!departureTimeFilter || (departureMinutes >= departureTimeFilter && departureMinutes < departureTimeFilter + 60))
              && (!arrivalTimeFilter || (arrivalMinutes >= arrivalTimeFilter && arrivalMinutes < arrivalTimeFilter + 60));
        });
        setWagons(filteredWagons);
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
      });
    }
  }, [departure, arrival, departureTimeFilter, arrivalTimeFilter]);

  const handleTimeChange = (event, setTime) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="selected_time_back_card">
        <div className="selected-info-card">
          <div id="destination-display">
            <h1>
              {departure && departure.name} — {arrival && arrival.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="time-filter">
            <select onChange={(e) => handleTimeChange(e, setDepartureTimeFilter)} value={departureTimeFilter}>
              <option value="">Any Departure Time</option>
              {[...Array(24).keys()].map(hour => (
                <option key={hour} value={hour * 60}>{`${hour.toString().padStart(2, '0')}:00`}</option>
              ))}
            </select>
            <select onChange={(e) => handleTimeChange(e, setArrivalTimeFilter)} value={arrivalTimeFilter}>
              <option value="">Any Arrival Time</option>
              {[...Array(24).keys()].map(hour => (
                <option key={hour} value={hour * 60}>{`${hour.toString().padStart(2, '0')}:00`}</option>
              ))}
            </select>
          </div>
      <div className="body-wrapper">
        <TrainCard wagons={wagons} routeParts={routeParts} setRouteParts={setRouteParts} />
        <div className="map">
          <MapRoute route_parts={routeParts} />
        </div>
      </div>
    </div>
  );
};

export default SelectWagonPage;
