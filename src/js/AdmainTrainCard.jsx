import React from "react";
import { Link, useNavigate } from "react-router-dom";


const AdmainTrainCard = () => {
  const wagons = [
    {
      wagon_id: 1,
      train_number: 1,
      type: "Passenger",
      number: "A123",
      rental_price: 99.99,
    },
    {
      wagon_id: 2,
      train_number: 2,
      type: "Cargo",
      number: "C456",
      rental_price: 199.99,
    },
    {
      wagon_id: 3,
      train_number: 3,
      type: "Passenger",
      number: "A789",
      rental_price: 149.99,
    },
    {
      wagon_id: 4,
      train_number: 4,
      type: "Dining",
      number: "D101",
      rental_price: 299.99,
    },
    {
      wagon_id: 5,
      train_number: 5,
      type: "Sleeping",
      number: "S112",
      rental_price: 249.99,
    },
  ];

  const navigate = useNavigate();

  const administrate = (wagon) => {
    localStorage.setItem("selectedWagon", JSON.stringify(wagon));
    navigate("/admin-administrate");
  };

  return (
    <>
      <div className="admin-panel-wrapper">
        <Link to="/admin-panel">
            <button className="dashboard-btn" link={"/admin-panel"}>
              Back
            </button>
          </Link>
      </div>
        <div id="train-time-info" className="section">
      {wagons.map((wagon) => (
        <div key={wagon.wagon_id} className="train-card">
          <div className="train-schedule-header">
            <h1>Train number: {wagon.train_number}</h1>
          </div>
          <div className="train-time-info">
            <p>Wagon Type: {wagon.type}</p>
          </div>
          <div className="seat-info">
            <p>Wagon number: {wagon.number}</p>
          </div>
          <div className="seat-info">
            <p>Rental price: {wagon.rental_price}</p>
          </div>
          <button className="book-btn" onClick={() => administrate(wagon)}>
            <p>Administrate</p>
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default AdmainTrainCard;
