import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import BookingPage from './js/Pages/BookingPage';
import AdminBookingPage from './js/Pages/AdminBookingPage';
import SelectWagonPage from './js/Pages/SelectWagonPage';
import Login from './js/Pages/LogIn'
import Register from './js/Pages/Register';
import SelectSeatPage from './js/Pages/SelectSeatPage';
import Checkout from './js/Pages/CheckoutPage';
import TicketPage from './js/Pages/TicketPage';
import ArchivedTicketPage from './js/Pages/ArchivedTicketPage';
import DashboardTicketsPage from './js/Pages/DashboardTicketsPage';
import DashboardServicePage from './js/Pages/DashboardServicesPage';
import DashboardWagonPage from './js/Pages/DashboardWagonPage';
import AdmainSelectTrain from './js/Pages/AdminSelectTrain';
import AdmainAdmainistrateTrain from './js/Pages/AdmainAdmainistrateTrain';
import InfoUser from './js/Pages/InfoUser';
import AdminPanel from './js/Pages/AdminPanel';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes>
        {/* <Route path='/' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/select-time" element={<SelectWagonPage />} />
        <Route path="/select-seat" element={<SelectSeatPage />} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/tickets' element={<TicketPage/>} />
        <Route path='/archived' element={<ArchivedTicketPage/>} />
        <Route path="/admin-book" element={<AdminBookingPage />} />     
        <Route path="/admin-select-train" element={<AdmainSelectTrain />} />     
        <Route path="/admin-administrate" element={<AdmainAdmainistrateTrain />} />     
        <Route path='/dashboard_tickets' element={<DashboardTicketsPage />} />
        <Route path='/dashboard_services' element={<DashboardServicePage />} />
        <Route path='/dashboard_wagons' element={<DashboardWagonPage />} />
        <Route path='/account' element={<InfoUser />} />
        <Route path='/admin-panel' element={<AdminPanel/>} /> */}
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
