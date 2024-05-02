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
  const [seatsInfo, setSeatsInfo] = useState([]);
  const [servicesInfo, setServicesInfo] = useState([]);
  const [routePartsIds, setRoutePartsIds] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(
    new Set(JSON.parse(localStorage.getItem("selectedSeats")) || initialSeats)
  );
  const [totalPrice, setTotalPrice] = useState(0);

  // User and Passengers, Services
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("http://localhost:9001/auth/whoami", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserData();

    const selectedPassengerIds = JSON.parse(
      localStorage.getItem("selectedPassengerId")
    );
    if (selectedPassengerIds) {
      const fetchPassengers = async () => {
        const passengerData = await Promise.all(
          selectedPassengerIds.map((passengerId) =>
            axios
              .get(`http://localhost:9001/passenger/${passengerId}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => response.data)
          )
        );
        setPassengerInfo(passengerData);
        setServicesInfo(
          passengerData.map((passenger) =>
            JSON.parse(localStorage.getItem(`selectedServices_${passenger.id}`))
          )
        );
      };
      fetchPassengers();
    }
  }, []);

  //Seats
  useEffect(() => {
    if (passengersInfo) {
      const updatedSeatsInfo = passengersInfo.map((passenger, index) => {
        const seat = localStorage.getItem(`passenger_${passenger.id}`);
        return seat;
      });
      setSeatsInfo(updatedSeatsInfo);
    }
  }, [passengersInfo]);

  // Total
  useEffect(() => {
    let total = 0;
    seatsInfo.forEach((seat) => {
      const parsedSeat = JSON.parse(seat);
      total += parsedSeat.seat_cost;
    });
    {
      passengersInfo &&
        passengersInfo.map((passenger, index) => {
          const services = JSON.parse(
            localStorage.getItem(`selectedServices_${passenger.id}`)
          );
          console.log("selectedServices ", services);
          <React.Fragment key={index}>
            {Array.isArray(services) ? (
              services.map((service, index) => (total += service.price))
            ) : (
              <p>No service information available</p>
            )}
          </React.Fragment>;
        });
    }
    setTotalPrice(total);
  }, [servicesInfo]);

//   useEffect(() => {
//     axios.get(`http://localhost:9001/routes/full`, {
//         params: {
//             wagon_id: wagon.wagonId,
//             departure_order: wagon.departure.order,
//             arrival_order: wagon.arrival.order,
//         },
//     })
//     .then((response) => {
//         const ids = response.data.map(item => item.id);
//         setRoutePartsIds(ids);
//         console.log("Updated routePartsIds", ids);
//     })
//     .catch((error) => {
//         console.error("Error fetching ticket prices:", error);
//     });
// }, [wagon]);

  const renderServices = () => {
    return (
      <>
        {servicesInfo.map((services, index) => (
          <React.Fragment key={index}>
            <h1>Services for {passengersInfo[index]?.firstName}:</h1>
            {services.map((service, serviceIndex) => (
              <ul key={serviceIndex}>
                <li>Name: {service.name}</li>
                <li>Price: {service.price}</li>
              </ul>
            ))}
          </React.Fragment>
        ))}
      </>
    );
  };

  const renderWagonInfo = () => {
    const wagonString = localStorage.getItem("selectedWagon");
    const arrivalString = localStorage.getItem("arrival");
    const departureString = localStorage.getItem("departure");
    if (!wagonString) {
      return null;
    }
    wagon = JSON.parse(wagonString);
    const arrival = JSON.parse(arrivalString);
    const departure = JSON.parse(departureString);

    if (wagon) {
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
            <span>
              {departure.name} -{" "}
              {minutesToTime(wagon.departure.departureTimeMinutes)}
            </span>
          </div>
          <div className="info-field">
            <label>Arrival:</label>
            <span>
              {arrival.name} - {minutesToTime(wagon.arrival.arrivalTimeMinutes)}
            </span>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization token is not available in localStorage");
      return null;
    }

    const routeResponse = await axios.get(`http://localhost:9001/routes/full`, {
      params: {
        wagon_id: wagon.wagonId,
        departure_order: wagon.departure.order,
        arrival_order: wagon.arrival.order,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const routePartsIds = routeResponse.data.map(item => item.id);
    console.log("Route Parts IDs fetched:", routePartsIds);
    

    {
      const postTicketRequests = passengersInfo.map(async (passenger) => {
        const seatData = JSON.parse(
          localStorage.getItem(`selected_seat_passenger_${passenger.id}`)
        );
        const serviceDataString = localStorage.getItem(
          `selectedServices_${passenger.id}`
        );
        const serviceData = JSON.parse(serviceDataString);
        const serviceIds = serviceData.map((item) => item.id);
        const response = await axios.post(
          "http://localhost:9001/tickets",
          {
            passenger_id: passenger.id,
            seat_id: seatData.id,
            fare_id: passenger.fare.id,
            services_ids: serviceIds,
            route_parts_ids: routePartsIds,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Ticket Created:", response.data);
        navigate("/tickets", { state: { fromCheckout: true } })
        return response.data;
      });

      Promise.all(postTicketRequests)
        .then((results) => {
          console.log("All tickets created:", results);
        })
        .catch((error) => {
          console.error("Error creating tickets:", error);
        });
    }
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
    return (
      <div className="checkout__summary">
        <h1>Order summary</h1>
        {renderWagonInfo()}
        {Array.isArray(seatsInfo) ? (
          seatsInfo.map((seat, index) => {
            const parsedSeat = JSON.parse(seat);
            return (
              <React.Fragment key={index}>
                <h1>Seat for {parsedSeat.firstName}</h1>
                <ul>
                  <li>Number of seat: {parsedSeat.ticket_number}</li>
                  <li>Price: {parsedSeat.seat_cost}</li>
                </ul>
              </React.Fragment>
            );
          })
        ) : (
          <p>No seat information available</p>
        )}
        {renderServices()}
        <div className="checkout__summary-total">
          <p className="checkout__summary-price">
            {/* {calculateTotal()} */}
            <h1>Subtotal: {totalPrice}</h1>
          </p>
        </div>
      </div>
    );
  };

  const minutesToTime = (minutes) => {
    const adjustedMinutes = minutes % 1440;
    const hours = Math.floor(adjustedMinutes / 60);
    const mins = adjustedMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
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
