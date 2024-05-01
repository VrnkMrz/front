import React, { useState, useEffect } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Ticket.css';

const DeleteTrain = () => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const nav = useNavigate();
    const location = useLocation();

    const handleDeleteTrain = () => {
        localStorage.removeItem('selectedWagon');
        setShowConfirmDialog(false);
        nav("/admin-select-train", { state: { deleteTrain: true } });
    };

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
        <>
            <button className="add-passenger-btn" onClick={() => setShowConfirmDialog(true)}>Delete train</button>
            {showConfirmDialog && (
                <ConfirmDialog
                    title="Delete Train"
                    message="Are you sure you want to delete this train?"
                    onCancel={() => setShowConfirmDialog(false)}
                    onConfirm={handleDeleteTrain}
                />
            )}
        </>
    );
};

export default DeleteTrain;
