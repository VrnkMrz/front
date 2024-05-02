// InfoUser.js
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import EditUserPopup from '../EditUserPopup';
import "../../css/InfoUser.css"
import '../../css/Admin.css'
import '../../css/Passenger.css';
import axios from 'axios';

function InfoUser() {
  const [userInfo, setUserInfo] = useState(null);
  const [editPopupVisible, setEditPopupVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:9001/auth/whoami', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        localStorage.setItem("user_info", JSON.stringify(response.data));
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    }
  }, []);

  const updateUserInfo = (updatedUserInfo) => {
    setUserInfo(updatedUserInfo);
  };

  return (
    <>
      <Navbar/>
      <div className='btn-container'>
        <button className="add-passenger-btn" onClick={() => setEditPopupVisible(true)}>Edit User</button>
      </div>
      <div className="info_container">
        <div className="user-info">
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
        </div>
      </div>
      {editPopupVisible && <EditUserPopup user={userInfo} onClose={() => setEditPopupVisible(false)} onUpdateUserInfo={updateUserInfo} />}
    </>
  );
}

export default InfoUser;
