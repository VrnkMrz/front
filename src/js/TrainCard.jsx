import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainCard = ({departure, arrival}) => {
  const [trainSchedules, setTrainSchedules] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/stations/by-names', {
          params: { departure, arrival }
        });
        setTrainSchedules(response.data.map(schedule => ({
          departureTime: schedule.departure_time_minutes,
          arrivalTime: schedule.arrival_time_minutes,
          departure: schedule.departure_station,
          arrival: schedule.arrival_station,
          price: schedule.price,
          seatsAvailable: schedule.free_seats
        })));
      } catch (error) {
        console.error('Failed to fetch stations', error);
      }
    };

    if (departure && arrival) {
      fetchStations();
    }
  }, [departure, arrival]);

  const navigate = useNavigate();
  
  const bookSeat = () => {
    navigate('/select-seat'); 
  };

  return (
    <div id="train-time-info" className="section">
      {trainSchedules.map((schedule, index) => (
        <div key={index} className="train-card">
          <div className="train-schedule-header">
            <h1>{schedule.departure} to {schedule.arrival}</h1>
          </div>
          <div className="train-time-info">
            <p>Departs: {schedule.departure} - Arrives: {schedule.arrival}</p>
          </div>
          <div className="seat-info">
            <p>Seats available: {schedule.seatsAvailable}</p>
          </div>
          <div className="seat-info">
            <p>Price: {schedule.price}</p>
          </div>
          <button className="book-btn" onClick={bookSeat}>
            <p>Choose</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TrainCard;
