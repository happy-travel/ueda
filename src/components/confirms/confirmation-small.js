import React from 'react';

const ConfirmationSmall = ({ yes, children }) => {
    return (
        <div className="confirmation-modal confirm-small">
            <div className="confirm-content">
                <div className="text-space">
                    <h3>Are you sure?</h3>
                    <div className="confirm-text">{children}</div>
                </div>
                <div className="confirm-actions">
                    <div className="accept" onClick={yes}>Confirm</div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationSmall;