import React from 'react';

const ConfirmationSmall = ({ yes, children }) => {
    return (
        <div className="confirmation-modal confirm-small">
            <div>
                <h3>Are you sure?</h3>
                <div>{children}</div>
                <div className="confirm-actions">
                    <div className="accept" onClick={yes}>Confirm</div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationSmall;