import React, { useState } from 'react';
// import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
// import 'react-phone-input-2/lib/style.css';
import PropTypes from 'prop-types';
import '../../css/CheckoutPage.css';
import Navbar from '../Navbar';

function Checkout({ selectedSeats: initialSeats }) {
    const navigate = useNavigate();
    const [checkoutToken, setCheckoutToken] = useState({});
    const [firstName, setFirstName] = useState('Jane');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('janedoe@email.com');
    const [phone, setPhone] = useState('0638706197');
    const [selectedSeats, setSelectedSeats] = useState(new Set(JSON.parse(localStorage.getItem('selectedSeats')) || initialSeats));

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/book', { state: { fromCheckout: true } });
    };

    const renderCheckoutForm = () => (
        <form className="checkout__form" onSubmit={handleSubmit}>
            <h1>Customer information</h1>
            <label className="checkout__label" htmlFor="firstName">First name</label>
            <input className="checkout__input" type="text" name="firstName" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" required />

            <label className="checkout__label" htmlFor="email">Email</label>
            <input className="checkout__input" type="text" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />

            <label className="checkout__label" htmlFor="phone">Phone</label>
            {/* <PhoneInput
                country={'uk'}
                value={phone}
                onChange={setPhone}
            /> */}
        </form>
    );

    const renderCheckoutSummary = () => (
        <div className="checkout__summary">
            <h1>Order summary</h1>
            <h1>Seats</h1>
            {Array.from(selectedSeats).map((seat, index) => (
                <ul key={index}>
                    <li>Number of seat: {seat}</li>
                    <li>Price: {seat.price}</li>
                </ul>
            ))}
            <div className="checkout__summary-total">
                <p className="checkout__summary-price">
                    <h1>Subtotal:</h1>
                </p>
            </div>
        </div>
    );

    return (
        <div>
            <Navbar label={"CHECKOUT"}/>
            <div className="checkout-page">
                <div className="checkout__wrapper">
                    {renderCheckoutForm()}
                </div>
                <div className="checkout__summary-wrapper">
                    {renderCheckoutSummary()}
                    <button className='next-button' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

Checkout.propTypes = {
    selectedSeats: PropTypes.array.isRequired,
};

export default Checkout;
