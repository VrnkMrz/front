import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import 'react-international-phone/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Register.css';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "phone": "+3806777777",
    "password": "11111111"
  });

  const [phone, setPhone] = useState('');
  const phoneIsValid = isPhoneValid(phone);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = () => {
    // if(!phoneIsValid){
    //   toast.error('Enter valid phone number');
    //   return;
    // }
    axios.post('http://localhost:9001/auth/login', formData, {
      headers: {
        'Content-Type': 'application/json',
    }
    })
      .then(response => {
        console.log(response);
        const token = response.data.access_token;
        localStorage.setItem('token', token); 
        console.log("Token begin: ", token);
        navigate('/book');
      })
      .catch(error => {
        console.error('There was an error!', error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className='register-form-container section'> 
      <div className='register-form'>
        <h3>Log In</h3>
        <div className="mb-3">
          <label>Phone number</label>
          <PhoneInput
            defaultCountry="ua"
            value={formData.phone}
            onChange={(phone) => setPhone(phone)}
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
        <div className="d-grid">
          <button type="submit" className="submit-button" onClick={handleLogin}>
            Submit
          </button>
        </div>
        <p className='forgot_password'>
          Not registered <a href='/register'>sign in?</a>
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

export default Login;
