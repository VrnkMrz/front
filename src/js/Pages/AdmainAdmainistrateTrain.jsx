import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import EditTrain from '../EditTrain';
import DeleteTrain from '../DeleteTrain';
import WagonFormPopup from '../AddTrainForm';
import '../../css/Admin.css'
import 'react-toastify/dist/ReactToastify.css';

const AdmainAdmainistrateTrain = () => {
    const [wagon, setWagon] = useState({}); 
    const nav = useNavigate();

    useEffect(() => {
        const fetchWagon = () => {
            const wagonData = localStorage.getItem('selectedWagon');
            if (wagonData) {
                setWagon(JSON.parse(wagonData)); 
            }
        };
        fetchWagon(); 
    }, []);

    const navBack = () => {
        nav('/admin-select-train', { state: { deleteTrain: false } });
    }

    return (
        <div>
            <Navbar label = {""}/>
            <div className='btn-container'>
                <button className="add-passenger-btn" onClick={navBack}>
                    Back to All trains
                </button>
                <EditTrain/>
                <DeleteTrain />
            </div>
            <div className="wagon-info">
                <h4>Wagon Information:</h4>
                {wagon && (
                    <ul>
                        <li>Train Number: {wagon.train_number}</li>
                        <li>Type: {wagon.type}</li>
                        <li>Number: {wagon.number}</li>
                        <li>Rental Price: {wagon.rental_price}</li>
                    </ul>
                )}
            </div> 
        </div>
    );
};

export default AdmainAdmainistrateTrain;
