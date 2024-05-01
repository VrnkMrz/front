import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import TrainFormPopup from './TrainFormPopup';
import '../css/Ticket.css';
import '../css/Passenger.css'; 
import { ToastContainer, toast } from 'react-toastify';


const EditTrain = ({ }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 

    const handleConfirm = () => {
        setShowConfirm(false);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };
    
    const handleEditTrainSubmit = (formData) => {
        toast.success("Train edit succesfully");
        console.log(formData);
        setShowPopup(false);
    };

    return (
        <>
            <button className="add-passenger-btn" onClick={() => setShowPopup(true)}>Edit Train</button>
            {showPopup && 
                <TrainFormPopup 
                    onClose={() => setShowPopup(false)} 
                    onSubmit={handleEditTrainSubmit}
                />
            }
            {showConfirm && <ConfirmDialog onConfirm={handleConfirm} onCancel={handleCancel} />}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                progress={undefined}
            />
        </>
    );
};

export default EditTrain;
