import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookingForm from "../BookingForm";
import MapCityPicker from "../MapCityPicker";
import Navbar from "../Navbar";
import axios from "axios";
import "../../css/BookingForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Ticket.css";

const Static = () => {
  const location = useLocation();
  const [tickets, setTickets] = useState([]);
  const [stat, setStat] = useState([]);
  const token = localStorage.getItem("token");
  const [filterStat, setFilterStat] = useState({});
  const [filters, setFilters] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3030/stats`, {
        params:
            filterStat
      })
      .then((response) => {
        setStat(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching stats", error);
      });
  }, [token]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterTickets = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3030/tickets`, { params: filters })
      .then((response) => {
        setTickets(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets", error);
      });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleFilterChange}>
        <label>
          Wagon Type:
          <input name="wagonType" />
        </label>
        <label>
          Month and Year:
          <input name="monthWithYear" placeholder="MM.YYYY" />
        </label>
        <button type="submit">Filter</button>
      </form>
      {/* Display stats here */}
      <div>
        <form onSubmit={handleFilterTickets}>
          <label>
            Wagon Type:
            <input name="wagonType" />
          </label>
          <label>
            Date:
            <input type="number" name="date" />
          </label>
          <label>
            Month and Year:
            <input name="monthWithYear" placeholder="MM.YYYY" />
          </label>
          <label>
            Age Group:
            <input name="ageGroup" placeholder="25 to 65" />
          </label>
          <label>
            Age:
            <input type="number" name="age" />
          </label>
          <button type="submit">Filter</button>
        </form>
        {tickets.length > 0 &&
          tickets.map((ticket, index) => (
            <div key={index} className="ticket-card">
 {tickets?.length &&
          tickets?.map((ticket, index) => (
            <div key={index} className="ticket-card">
              <h3>Ticket</h3>
              <p>
                Date of Sale: {ticket.date_sale.year}-{ticket.date_sale.month}-
                {ticket.date_sale.date}
              </p>
              <p>
                Use Date: {ticket.date_usage.year}-{ticket.date_usage.month}-
                {ticket.date_usage.date}
              </p>
              <p>Days until use: {ticket.days_diff}</p>
              <p>Final Station: {ticket.final_station.name}</p>
              <p>Start Station: {ticket.start_station.name}</p>
              <p>
                Passenger Age: {ticket.passenger_age.age_value} (
                {ticket.passenger_age.age_group})
              </p>
              <p>Seat Number: {ticket.seat.number}</p>
              <p>Wagon Type: {ticket.wagon.wagon_type}</p>
              <p>Train Number: {ticket.wagon.train_number}</p>
              <p>Train Type: {ticket.wagon.train_type}</p>
              <p>Wagon Number: {ticket.wagon.wagon_number}</p>
              <p>Ticket Cost: ${ticket.ticket_cost.toFixed(2)}</p>
              <p>
                Time of Sale: {ticket.time_sale.hours}:
                {ticket.time_sale.minutes}
              </p>
            </div>
          ))}            </div>
          ))}
      </div>
    </div>
  );
};

export default Static;
