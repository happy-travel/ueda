import React from 'react';

const ConfirmationLarge = ({ yes, no, children }) => {
    return (
        <div className="confirmation-modal confirm-large">
            <div className="confirm-content">
                <div className="header-wrapper"><h2>Are you absolutely sure?</h2></div>
                <div className="confirm-text">{children}</div>
                <div className="confirm-actions">
                    <div onClick={no}>Cancel</div>
                    <div className="accept" onClick={yes}>Confirm</div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationLarge;