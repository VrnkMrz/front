import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TrainCard = ({ wagons, setRouteParts }) => {
  const navigate = useNavigate();
  const [seatsAvailable, setSeatsAvailable] = useState({});
  const [wagonsWithSeats, setWagonsWithSeats] = useState([]);
  const [selectedWagonId, setSelectedWagonId] = useState(null);  

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const seatsData = await Promise.all(
          wagons.map((wagon) =>
            axios.get(`http://localhost:9001/tickets/available-seats/${wagon.wagonId}`)
              .then((response) => ({
                wagonId: wagon.wagonId,
                seatsAvailable: response.data,
              }))
          )
        );
        const updatedSeats = seatsData.reduce(
          (acc, { wagonId, seatsAvailable }) => {
            acc[wagonId] = seatsAvailable;
            return acc;
          },
          {}
        );
        setSeatsAvailable(updatedSeats);
        setWagonsWithSeats(wagons.map(wagon => ({
          ...wagon,
          seatsAvailable: updatedSeats[wagon.wagonId],
        })));
      } catch (error) {
        console.error("Error fetching available seats:", error);
      }
    };
    fetchAvailableSeats();
  }, [wagons]);

  const handleCardClick = async (wagon) => {
    try {
      const response = await axios.get(`http://localhost:9001/routes/full`, {
        params: {
          wagon_id: wagon.wagonId,
          departure_order: wagon.departure.order,
          arrival_order: wagon.arrival.order
        },
      });
      setRouteParts(response.data || []); 
      setSelectedWagonId(wagon.wagonId); 
    } catch (error) {
      console.error("Error on card click:", error);
    }
  };

  const bookSeat = (wagon) => {
    localStorage.setItem('selectedWagon', JSON.stringify(wagon)); // Store wagon data in localStorage
    navigate("/select-seat");
  };

  const minutesToTime = (minutes) => {
    const adjustedMinutes = minutes % 1440;
    const hours = Math.floor(adjustedMinutes / 60);
    const mins = adjustedMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div id="train-time-info" className="section">
      {wagonsWithSeats.map((wagon, index) => (
        <div key={index} className={`train-card ${selectedWagonId === wagon.wagonId ? 'selected' : ''}`} onClick={() => handleCardClick(wagon)}>
          <div className="train-time-info">
            <p>Departs: {minutesToTime(wagon.departure.departureTimeMinutes)}</p>
          </div>
          <div className="train-time-info">
            <p>Arrives: {minutesToTime(wagon.arrival.arrivalTimeMinutes)}</p>
          </div>
          <div className="seat-info">
            <p>Seats available: {wagon.seatsAvailable.length ? wagon.seatsAvailable.length : 'N/A'}</p>
          </div>
          <button className="book-btn" onClick={() => bookSeat(wagon)}>Choose</button>
        </div>
      ))}
    </div>
  );
};

export default TrainCard;
