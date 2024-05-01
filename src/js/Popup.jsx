import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Popup.css'

const Popup = ({ onClose }) => {
  return (
    <div className="popup-dropdown">
      <ul>
        <li><Link to="/account" onClick={onClose}>Account</Link></li>
        <li><Link to="/tickets" onClick={onClose}>History</Link></li>
        <li><Link to="/archived" onClick={onClose}>Archive</Link></li>
      </ul>
    </div>
  );
};

export default Popup;
