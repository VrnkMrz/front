import React from 'react';

const ConfirmDialog = ({ onConfirm, onCancel }) => {
    return (
        <div className="confirm-dialog">
            <div className="confirm-content">
                <p>Are you sure you want to return the ticket?</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>Close</button>
            </div>
        </div>
    );
};

export default ConfirmDialog;
