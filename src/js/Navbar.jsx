import React, { useState } from 'react';
import '../css/Navbar.css';
import '../css/styles.css';
import account from '../img/account.png';
import icon from '../img/ticket.png';
import Popup from './Popup';  
import { useNavigate } from 'react-router-dom';

const Navbar = ({label}) => {
  const navigate = useNavigate();
  const book = () => {
    navigate('/book'); 
  };

  const [popupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={icon} alt="Tickets Logo" className='navbar-logo' onClick={book} />
        </div>
        <h2>{label}</h2>
        <div className="navbar-links" onClick={togglePopup}>
          <img src={account} alt="Account" />
        </div>
      </div>
      {popupVisible && <Popup />}
    </nav>
  );
};

export default Navbar;
