import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Passenger.css";
import "../css/Train.css";
import Navbar from "./Navbar";
import MapRouteTrain from "./MapRouteTrain";
import { ToastContainer, toast } from "react-toastify";

const AddTrainForm = () => {
  const [wagonData, setWagonData] = useState({
    number: "",
    type: "",
    class: "",
    wagon: {
      number: "",
      type: "",
      rental_price: "",
      seats_count: "",
    },
    route_parts: [],
    additional_services_ids: [],
  });
  let routeParts = new Set();
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const [services, setServices] = useState([]);
  const [cityId, setCityId] = useState(null);

  const handleCitySelect = (id) => {
    setCityId(id);
  };

  useEffect(() => {
        axios
          .get(`http://localhost:9001/additional-services`)
          .then((response) => {
            setServices(response.data);
            console.log("services", services);
          })
          .catch((error) => {
            console.error("Error fetching additional services:", error);
            setError("Failed to fetch services. Please try again later.");
          });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("wagon.")) {
      const wagonField = name.split(".")[1];
      setWagonData((prevData) => ({
        ...prevData,
        wagon: { ...prevData.wagon, [wagonField]: value },
      }));
    } else {
      setWagonData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddRoutePart = () => {
    const stationIdsString = localStorage.getItem("city_ids");
    const stationIdsArray = stationIdsString.split(" ");
    console.log("stationIdsArray", stationIdsArray);
    axios
      .post("http://localhost:9001/stations/map-to-segments", {
        station_ids: stationIdsArray.map(Number),
      })
      .then((response) => {
        routeParts = response;
        console.log("response.data", response.data);
      })
      .catch((error) => console.error("Error posting station IDs:", error));
  };

  const handleRoutePartChange = (index, field, value) => {
    const updatedRouteParts = [...wagonData.route_parts];
    updatedRouteParts[index][field] = value;
    setWagonData((prevData) => ({
      ...prevData,
      route_parts: updatedRouteParts,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Wagon to be added: ", wagonData);
      await axios.post("http://localhost:9001/trains", wagonData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Wagon added successfully!");
    } catch (error) {
      console.error("Error adding wagon:", error);
      setError("Failed to add wagon. Please try again later.");
    }
  };

  return (
    <>
      <div>
        <Navbar label={""} />
        <div className="section ">
          <div className="booking-overlay">
            <div className="section-center">
              <div className="container">
                <div className="booking-content">
                  <div className="train-container">
                    <h3>Add New Wagon</h3>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <input
                      className="popup-content_input"
                      type="text"
                      name="number"
                      placeholder="Train Number"
                      onChange={handleChange}
                    />
                    <input
                      className="popup-content_input"
                      type="text"
                      name="type"
                      placeholder="Train Type"
                      onChange={handleChange}
                    />
                    <input
                      className="popup-content_input"
                      type="text"
                      name="class"
                      placeholder="Class"
                      onChange={handleChange}
                    />
                    <input
                      className="popup-content_input"
                      type="text"
                      name="wagon.number"
                      placeholder="Wagon Number"
                      onChange={handleChange}
                    />
                    <input
                      className="popup-content_input"
                      type="text"
                      name="wagon.type"
                      placeholder="Wagon Type"
                      onChange={handleChange}
                    />
                    <input
                      className="popup-content_input"
                      type="text"
                      name="wagon.rental_price"
                      placeholder="Rental Price"
                      onChange={handleChange}
                    />
                    <input
                      className="popup-content_input"
                      type="text"
                      name="wagon.seats_count"
                      placeholder="Seats Count"
                      onChange={handleChange}
                    />
                    {/* {services.map((service, index) => (
                      <div key={index}>
                      <input
                        className="popup-content_input"
                        type="checkbox"
                        value={service}
                        onChange={}
                      />
                  ))} */}
                    {wagonData.route_parts.map((part, index) => (
                      <div key={index}>
                        <input
                          className="popup-content_input"
                          type="text"
                          value={part.segment_id}
                          onChange={(e) =>
                            handleRoutePartChange(
                              index,
                              "segment_id",
                              e.target.value
                            )
                          }
                          placeholder="Segment ID"
                        />
                        <input
                          className="popup-content_input"
                          type="text"
                          value={part.departure_time_minutes}
                          onChange={(e) =>
                            handleRoutePartChange(
                              index,
                              "departure_time_minutes",
                              e.target.value
                            )
                          }
                          placeholder="Departure Time"
                        />
                        <input
                          className="popup-content_input"
                          type="text"
                          value={part.arrival_time_minutes}
                          onChange={(e) =>
                            handleRoutePartChange(
                              index,
                              "arrival_time_minutes",
                              e.target.value
                            )
                          }
                          placeholder="Arrival Time"
                        />
                        <input
                          className="popup-content_input"
                          type="text"
                          value={part.price}
                          onChange={(e) =>
                            handleRoutePartChange(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                          placeholder="Price"
                        />
                        <input
                          className="popup-content_input"
                          type="text"
                          value={part.order}
                          onChange={(e) =>
                            handleRoutePartChange(
                              index,
                              "order",
                              e.target.value
                            )
                          }
                          placeholder="Order"
                        />
                      </div>
                    ))}
                    <MapRouteTrain onCitySelect={handleCitySelect} />
                    <button onClick={handleAddRoutePart}>Add Route Part</button>
                    <button onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default AddTrainForm;
