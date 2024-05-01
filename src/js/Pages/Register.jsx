import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import 'react-international-phone/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Register.css';
import 'react-toastify/dist/ReactToastify.css';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Max',
    email: 'example@gmail.com',
    phone: "+380677777799",
    password: "11111111"
  });
  const [phone, setPhone] = useState('');
  const phoneIsValid = isPhoneValid(phone);

  const selectTime = () => {
    // if (!phoneIsValid) {
    //   toast.error('Enter valid phone number');
    //   return;
    // }
    axios.post('http://localhost:9001/users', formData)
      .then(response => {
        // const token = response.data.token;
        // sessionStorage.setItem('token', token);
        navigate('/login');
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          toast.error('User with this phone number already exists');
        } 
        else if(error.response && error.response.status === 500){
          toast.error('Server problem');

        }
        else {
          console.error('There was an error!', error);
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className='register-form-container section'>
      <div className='register-form'>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <div className='phone-input'>
          <label>Phone number</label>
            <PhoneInput
              inputClass="phone-input"
              buttonClass="phone-button"
              defaultCountry="ua"
              value={formData.phone}
              onChange={(phone) => setPhone(phone)}
            />
          </div>
        </div>

        <div className="d-grid">
          <button type="button" className="submit-button" onClick={selectTime}>
            Submit
          </button>
        </div>

        <p className='forgot_password'>
            Already registered <a href="/login">log in?</a>
        </p>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
    </div>
  );
}

export default Register;
