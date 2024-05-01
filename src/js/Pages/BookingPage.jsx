import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from '../BookingForm';
import MapCityPicker from '../MapCityPicker';
import Navbar from '../Navbar';
import '../../css/BookingForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingPage = () => {
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.fromCheckout) {
            toast.success("Reservation successful!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [location]);

  return (
    <div> 
      <Navbar label = {"MAKE YOUR RESERVATION"}/>
      <div className="section ">
        <div className="booking-overlay">
          <div className="section-center">
            <div className="container">
              <div className="booking-content">
                <BookingForm arrival={arrival} setArrival={setArrival}  departure={departure} setDeparture={setDeparture} />
                <MapCityPicker setArrival={setArrival} setDeparture={setDeparture} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingPage;
