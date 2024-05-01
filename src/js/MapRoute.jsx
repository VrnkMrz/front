import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapBoundsSetter = ({ route_parts }) => {
    const map = useMap();

    useEffect(() => {
        const bounds = new L.LatLngBounds();
        if (Array.isArray(route_parts)) {
            route_parts.forEach(part => {
                if (part.segment) {
                    const depCoords = new L.LatLng(part.segment.departure_station.lat, part.segment.departure_station.lon);
                    const arrCoords = new L.LatLng(part.segment.arrival_station.lat, part.segment.arrival_station.lon);
                    bounds.extend(depCoords);
                    bounds.extend(arrCoords);
                }
            });

            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [route_parts, map]); 

    return null; 
};

const MapRoute = ({ route_parts }) => {
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
        <MapBoundsSetter route_parts={route_parts} />
        {Array.isArray(route_parts) && route_parts.map((part, index) => (
          <React.Fragment key={index}>
            <Marker position={[part.segment.departure_station.lat, part.segment.departure_station.lon]} icon={customIcon}>
              <Popup>{part.segment.departure_station.name}</Popup>
            </Marker>
            <Marker position={[part.segment.arrival_station.lat, part.segment.arrival_station.lon]} icon={customIcon}>
              <Popup>{part.segment.arrival_station.name}</Popup>
            </Marker>
            <Polyline
              positions={[
                [part.segment.departure_station.lat, part.segment.departure_station.lon],
                [part.segment.arrival_station.lat, part.segment.arrival_station.lon]
              ]}
              color="blue"
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapRoute;
