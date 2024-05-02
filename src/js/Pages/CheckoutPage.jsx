import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "../../css/CheckoutPage.css";
import Navbar from "../Navbar";

function Checkout({ selectedSeats: initialSeats }) {
  const navigate = useNavigate();
  let wagon = [];
  const [userInfo, setUserInfo] = useState(null);
  const [passengersInfo, setPassengerInfo] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(
    new Set(JSON.parse(localStorage.getItem("selectedSeats")) || initialSeats)
  );

  //User
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:9001/auth/whoami", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  //Passengers
  useEffect(() => {
    const token = localStorage.getItem("token");
    const selectedPassengerIds = JSON.parse(
      localStorage.getItem("selectedPassengerId")
    );

    if (token && selectedPassengerIds) {
      const fetchData = async () => {
        try {
          const passengerData = await Promise.all(
            selectedPassengerIds.map(async (passengerId) => {
              const response = await axios.get(
                `http://localhost:9001/passenger/${passengerId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data;
            })
          );
          console.log("Passenger info: ", passengerData);
          setPassengerInfo(passengerData);
        } catch (error) {
          console.error("Error fetching passenger info:", error);
        }
      };
      fetchData();
    }
  }, []);

  const renderWagonInfo = () => {
    const wagonString = localStorage.getItem("selectedWagon");
    const arrivalString = localStorage.getItem('arrival');
    const departureString = localStorage.getItem('departure');
    if (!wagonString) {
      return null;
    }

    wagon = JSON.parse(wagonString);
    const arrival = JSON.parse(arrivalString);
    const departure = JSON.parse(departureString);
    
    if (wagon) {
      console.log("aarval: ", arrival, departure);
      return (
        <>
            <div className="info-field">
              <label>Wagon number:</label>
              <span>{wagon.wagon.number}</span>
            </div>
            <div className="info-field">
              <label>Wagon Type:</label>
              <span>{wagon.wagon.type}</span>
            </div>
            <div className="info-field">
              <label>Departure:</label>
              <span>{departure.name} - {minutesToTime(wagon.departure.departureTimeMinutes)}</span>
            </div>
            <div className="info-field">
              <label>Arrival:</label>
              <span>{arrival.name} - {minutesToTime(wagon.arrival.arrivalTimeMinutes)}</span>
            </div>
        </>
      );
    } else {
      return null;
    }
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/book", { state: { fromCheckout: true } });
  };

  const renderUser = () => (
    <form className="checkout__form" onSubmit={handleSubmit}>
      <h1>User Information</h1>
      {userInfo && (
        <>
          <div className="info-field">
            <label>Name:</label>
            <span>{userInfo.name}</span>
          </div>
          <div className="info-field">
            <label>Email:</label>
            <span>{userInfo.email}</span>
          </div>
          <div className="info-field">
            <label>Phone:</label>
            <span>{userInfo.phone}</span>
          </div>
        </>
      )}
    </form>
  );

  const renderPassengers = () => (
    <>
      {passengersInfo &&
        passengersInfo.map((passenger, index) => (
          <div key={index} className="checkout__form">
            <h1>Passenger Information</h1>
            <div className="info-field">
              <label>Name:</label>
              <span>{passenger.firstName}</span>
            </div>
            <div className="info-field">
              <label>Last Name:</label>
              <span>{passenger.lastName}</span>
            </div>
            <div className="info-field">
              <label>Fare:</label>
              <span>{passenger.fare.title}</span>
            </div>
            <div className="info-field">
              <label>Phone:</label>
              <span>{userInfo.phone}</span>
            </div>
          </div>
        ))}
    </>
  );

  const renderCheckoutSummary = () => {
    return(
    <div className="checkout__summary">
      <h1>Order summary</h1>
      {renderWagonInfo()}
      <h1>Seats</h1>
      {Array.from(selectedSeats).map((seat, index) => (
        <ul key={index}>
          <li>Number of seat: {seat.number}</li>
          <li>Price: {seat.price}</li>
        </ul>
      ))}
      <div className="checkout__summary-total">
        <p className="checkout__summary-price">
          <h1>Subtotal:</h1>
        </p>
      </div>
    </div>
    )
  }

  const minutesToTime = (minutes) => {
    const adjustedMinutes = minutes % 1440;
    const hours = Math.floor(adjustedMinutes / 60);
    const mins = adjustedMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <Navbar label={"CHECKOUT"} />
      <div className="checkout-page">
        <div className="checkout__user_pass">
          <div className="checkout__wrapper">{renderUser()}</div>
          <div className="checkout__wrapper">{renderPassengers()}</div>
        </div>
        <div className="checkout__summary-wrapper">
          {renderCheckoutSummary()}
          <button className="next-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

Checkout.propTypes = {
  selectedSeats: PropTypes.array.isRequired,
};

export default Checkout;
