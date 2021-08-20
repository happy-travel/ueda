import React from 'react';

const Confirmation = ({ yes, no, children }) => {
    return (
        <div className="confirmation-modal">
            <h3>Are you sure?</h3>
            <div>{children}</div>
            <div className="confirm-actions">
                <div onClick={no}>Cancel</div>
                <div className="accept" onClick={yes}>Confirm</div>
            </div>
        </div>
    )
}

export default Confirmation;