import React, { useEffect, useState } from 'react';
import AdmainTrainCard from '../AdmainTrainCard';
import Navbar from '../Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/TrainCard.css';

const AdmainSelectTrain = () => {
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();  // Use useNavigate hook for navigation and state updates

    useEffect(() => {
        if (location.state?.deleteTrain) {
            toast.success("Delete train successful!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Update the location state to remove the deleteTrain flag
            navigate(location.pathname, { replace: true, state: { ...location.state, deleteTrain: false } });
        }
    }, [location, navigate]);

    // Function to toggle the visibility of the popup
    const togglePopup = () => {
        navigate("/add-train");
    };

    return (
        <div>
            <Navbar />
            <button className="add-passenger-btn" onClick={togglePopup}>
                Add train
            </button>
            <AdmainTrainCard />
            <ToastContainer />
        </div>
    );
};

export default AdmainSelectTrain;
