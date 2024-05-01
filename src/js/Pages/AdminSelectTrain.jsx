import React, { useEffect } from 'react';
import AdmainTrainCard from '../AdmainTrainCard';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/TrainCard.css';

const AdmainSelectTrain = () => {
    const location = useLocation();

    useEffect(() => {
      console.log(location.state);
        if (location.state && location.state.deleteTrain) {
            toast.success("Delete train successful!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            location.state.deleteTrain = false;
        }
    }, [location]);

    return (
        <div>
            <Navbar />
            <AdmainTrainCard />
            <ToastContainer />
        </div>
    );
};

export default AdmainSelectTrain;