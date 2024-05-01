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
      axios
        .get("http://localhost:9001/routes", {
          params: {
            arrival_station: arrival.id,
            departure_station: departure.id,
          },
        })
        .then((response) => {
          console.log(response.data);
          setWagons(response.data);
        })
        .catch((error) => {
          console.error("Error fetching routes:", error);
        });
    }
  }, [departure, arrival]);

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
      <TrainCard wagons={wagons} />
      <MapRoute />
      {wagons.length > 0 && (
        <div>
          <h2>Routes</h2>
          <ul>
            {wagons.map((route) => (
              <li key={route.id}>{route.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectWagonPage;
