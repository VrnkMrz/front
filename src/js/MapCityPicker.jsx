import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let selectedField = 'departure';

const MapCityPicker = ({ setArrival, setDeparture }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9001/stations')
      .then(response => {
        const stations = response.data.map(station => ({
          id: station.id,
          name: station.name,
          lon: station.lon,
          lat: station.lat,
          coords: [station.lat, station.lon],
        }));
        setCities(stations);
      })
      .catch(error => console.log(error));
  }, []);

  const handleMarkerClick = (city) => {
    if (selectedField === 'departure') {
      setDeparture(city);
      selectedField = 'arrival';
      localStorage.setItem("departure", JSON.stringify(city));
    } else if (selectedField === 'arrival') {
      setArrival(city);
      selectedField = 'departure';
      localStorage.setItem("arrival", JSON.stringify(city));
    }
  };

  const customIcon = new L.Icon({
    iconUrl: require('../img/location_pin.png'), 
    iconSize: [35, 35], 
    iconAnchor: [17, 35], 
    popupAnchor: [0, -35],
  });

  return (
    <div className="map-container">
      <MapContainer center={[50.8503, 4.3517]} zoom={7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cities.map(city => (
          <Marker 
            key={city.id} 
            position={city.coords} 
            icon={customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(city),
            }}
          >        
            <Popup>{city.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapCityPicker;