import React from 'react';

const Confirmation = ({ yes, no }) => {
    return (
        <div className="confirmation-modal">
            <h3>Are you sure?</h3>
            <div>Manual operations are is for correction of mistakes only</div>
            <div className="confirm-actions">
                <div onClick={no}>Cancel</div>
                <div className="accept" onClick={yes}>Confirm</div>
            </div>
        </div>
    )
}

export default Confirmation;